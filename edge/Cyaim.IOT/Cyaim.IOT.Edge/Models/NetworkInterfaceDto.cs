using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Models
{
    public class NetworkInterfaceDto
    {
        /// <summary>
        /// 标识符
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 网络类型
        /// </summary>
        public NetworkInterfaceType NetworkInterfaceType { get; set; }

        /// <summary>
        /// 链接速度
        /// </summary>
        public long Speed { get; set; }

        /// <summary>
        /// 操作状态
        /// </summary>
        public OperationalStatus OperationalStatus { get; set; }

        /// <summary>
        /// MAC
        /// </summary>
        public string MAC { get; set; }
    }
}
