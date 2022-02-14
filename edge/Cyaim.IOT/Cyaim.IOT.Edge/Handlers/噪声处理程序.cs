using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Handlers
{
    public class 噪声处理程序 : IDataHandler
    {
        public DataConverted Invoke(DateTimeOffset date, bool[] colilsBuffer, ushort[] registerBuffer, bool isWrite, object state)
        {
            return new DataConverted()
            {
                Date = date,
                Data = new Dictionary<string, decimal>()
                {
                    { "噪声",(registerBuffer[0]/ (decimal)10)},
                }
            };
        }
    }
}

