using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge
{
    public interface IDataHandler
    {
        /// <summary>
        /// 数据处理方法
        /// </summary>
        /// <param name="isWrite">是否为写入</param>
        /// <param name="date">采集时间</param>
        /// <param name="colilsBuffer">采集传入bool</param>
        /// <param name="registerBuffer">采集传入ushort</param>
        /// <returns>返回数据</returns>
        DataConverted Invoke(DateTimeOffset date, bool[] colilsBuffer, ushort[] registerBuffer, bool isWrite, object state);

    }

    public class DataConverted
    {
        public DateTimeOffset Date { get; set; }

        public Dictionary<string, decimal> Data { get; set; }


    }
}
