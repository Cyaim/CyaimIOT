using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Common
{
    public class CRCHelper
    {


        static readonly UInt16[] crcTlb = new UInt16[16]{0x0000, 0xCC01, 0xD801, 0x1400, 0xF001, 0x3C00, 0x2800, 0xE401,
 0xA001, 0x6C00, 0x7800, 0xB401, 0x5000, 0x9C01, 0x8801, 0x4400};
        
        /// <summary>
        /// 查短表法计算CRC16
        /// </summary>
        /// <param name="pBuf"></param>
        /// <returns></returns>
        public static UInt16 CRC16(byte[] pBuf)
        {
            byte i = 0, ch = 0;
            UInt16 crc = 0xFFFF;
            for (i = 0; i < pBuf.Length - 2; i++)
            {
                ch = pBuf[i];
                crc = (UInt16)(crcTlb[(ch ^ crc) & 0x0F] ^ (crc >> 4));
                crc = (UInt16)(crcTlb[((ch >> 4) ^ crc) & 0x0F] ^ (crc >> 4));
            }
            crc = (UInt16)((crc & 0xFF) << 8 | (crc >> 8));
            return crc;
        }

        /// <summary>
        /// 验证CRC16校验码
        /// </summary>
        /// <param name="value">校验数据(包含底端设备上传的CRC校验值)</param>
        /// <param name="poly">多项式码</param>
        /// <param name="crcInit">校验码初始值</param>
        /// <returns></returns>
        public static bool CheckCRC16(byte[] value, ushort poly = 0xA001, ushort crcInit = 0xFFFF, string mode = "Table")
        {
            if (value == null || !value.Any())
                throw new ArgumentException("生成CRC16的入参有误");

            var crc16 = new byte[2];
            if (mode == "Table")
            {
                var result = CRC16(value);
                crc16[0] = (byte)(result >> 8);
                crc16[1] = (byte)(result);
            }
            else
            {
                crc16 = CRC16(value, poly, crcInit);
            }

            if ((value[value.Length - 1] == crc16[crc16.Length - 1]) && (value[value.Length - 2] == crc16[crc16.Length - 2]))
                return true;

            return false;
        }

        /// <summary>
        /// 计算CRC16校验码
        /// </summary>
        /// <param name="value">校验数据</param>
        /// <param name="poly">多项式码，CRC16 8005,CRC12 80F,CRC8 5E,CRC8 07,CRC8 31,CRC4 3</param>
        /// <param name="crcInit">校验码初始值</param>
        /// <returns>高字节在前，低字节在后</returns>
        public static byte[] CRC16(byte[] value, ushort poly = 0xA001, ushort crc = 0xFFFF)
        {
            if (value == null || !value.Any())
                throw new ArgumentException("生成CRC16的入参有误");
            //运算
            //ushort crc = crcInit;
            for (int i = 0; i < value.Length - 2; i++)
            {
                //Step1.与校验对象的某字节取异或
                crc = (ushort)(crc ^ (value[i]));
                for (int j = 0; j < 8; j++)
                { //Step2.==0？右移1比特，否则右移1 bit与多项式异或
                    crc = (crc & 1) != 0 ? (ushort)((crc >> 1) ^ poly) : (ushort)(crc >> 1);
                }
            }
            byte hi = (byte)((crc & 0xFF00) >> 8); //高位置
            byte lo = (byte)(crc & 0x00FF);   //低位置

            //byte[] buffer = new byte[value.Length + 2];
            //value.CopyTo(buffer, 0);
            //buffer[buffer.Length - 1] = hi;
            //buffer[buffer.Length - 2] = lo;
            //return buffer;
            byte[] returnVal = new byte[2];
            returnVal[1] = hi;//CRC高位
            returnVal[0] = lo;//CRC低位
            return returnVal;
        }

    }
}
