using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Handlers
{
    public class 空气质量处理程序 : IDataHandler
    {
        public DataConverted Invoke(DateTimeOffset date, bool[] colilsBuffer, ushort[] registerBuffer, bool isWrite, object state)
        {
            return new DataConverted()
            {
                Date = date,
                Data = new Dictionary<string, decimal>()
                {
                    { "PM1.0",(registerBuffer[0])},
                    { "PM2.5",(registerBuffer[1])},
                    { "PM10",(registerBuffer[2])},
                }
            };
        }
    }
}

