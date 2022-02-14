using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Websocket.Client;

namespace Cyaim.IOT.Edge
{
    public class GlobalData
    {

        public static string ConnectionString { get; set; } = "Data Source=../../../Temps/temp.cyaim";

        public static bool InitComplated { get; set; }

        public static CollectConfigDto CollectConfig { get; set; }

        public static Dictionary<SerialPort, int> Coms { get; set; }

        public static JsonSerializerSettings JsonSerializerSettings { get; set; } = new JsonSerializerSettings();

        public static WebsocketClient WebsocketClient { get; set; }

        static GlobalData()
        {
            JsonSerializerSettings.TypeNameHandling = TypeNameHandling.All;
        }


    }
}
