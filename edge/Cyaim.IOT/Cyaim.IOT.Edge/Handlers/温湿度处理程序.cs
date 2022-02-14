using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Handlers
{
    public class 温湿度处理程序 : IDataHandler
    {
        public DataConverted Invoke(DateTimeOffset date, bool[] colilsBuffer, ushort[] registerBuffer, bool isWrite, object state)
        {
            return new DataConverted()
            {
                Date = date,
                Data = new Dictionary<string, decimal>()
                {
                    { "温度",(registerBuffer[0]/ (decimal)10)},
                    { "湿度",(registerBuffer[1]/ (decimal)10)},
                }
            };
        }
    }
}

