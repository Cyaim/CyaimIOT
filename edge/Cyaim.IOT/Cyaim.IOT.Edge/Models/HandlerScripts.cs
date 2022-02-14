using System;
using System.Linq;
using System.Text;
using SqlSugar;

namespace Cyaim.IOT.Edge.Models
{
    ///<summary>
    ///
    ///</summary>
    [SugarTable("HandlerScripts")]
    public partial class HandlerScripts
    {
        public HandlerScripts()
        {


        }
        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>           
        [SugarColumn(IsPrimaryKey = true)]
        public string ID { get; set; }

        /// <summary>
        /// Desc:
        /// Default:
        /// Nullable:False
        /// </summary>           
        public string Script { get; set; }


        public string DLLPath { get; set; }
    }
}
