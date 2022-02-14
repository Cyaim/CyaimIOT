using Cyaim.IOT.Edge.Models;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge
{
    public class Log
    {
        public static SqlSugarClient DB = new SqlSugarClient(new ConnectionConfig()
        {
            ConnectionString = GlobalData.ConnectionString,
            DbType = DbType.Sqlite,
            IsAutoCloseConnection = true,

        });


        public static void Information(string msg, string content = null)
        {
            GetLog(0, msg, content);
        }

        public static void Information(Exception exception)
        {
            GetLog(0, exception);
        }

        public static void Warning(string msg, string content = null)
        {
            GetLog(1, msg, content);
        }

        public static void Warning(Exception exception)
        {
            GetLog(1, exception);
        }

        public static void Error(string msg, string content = null)
        {
            GetLog(2, msg, content);
        }

        public static void Error(Exception exception)
        {
            GetLog(2, exception);
        }

        private static void GetLog(int logLevel, string msg, string content)
        {
            DB.Insertable(new Logs()
            {
                ID = Guid.NewGuid().ToString("N"),
                LogLevel = logLevel,
                Date = DateTime.Now,
                Message = msg,
                Content = content
            }).ExecuteCommand();
        }

        private static void GetLog(int logLevel, Exception exception)
        {
            DB.Insertable(new Logs()
            {
                ID = Guid.NewGuid().ToString("N"),
                LogLevel = logLevel,
                Date = DateTime.Now,
                Message = exception.Message,
                Content = exception.StackTrace
            }).ExecuteCommand();
        }
    }
}
