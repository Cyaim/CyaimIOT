using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Cyaim.IOT.Edge.Common
{
    public class GenerateCodeHelper
    {

        /// <summary>
        /// 动态编译
        /// </summary>
        /// <param name="assemblyName">程序集名称，空随机生成</param>
        /// <param name="assemblyCode">输出DLL字节码</param>
        /// <param name="codes">代码</param>
        /// <returns>程序集</returns>
        public static Assembly GenerateAssemblyFromCode(string assemblyName, out byte[] assemblyCode, params string[] codes)
        {
            Assembly assembly = null;

            SyntaxTree[] syntaxTrees = new SyntaxTree[codes.Length];
            try
            {
                for (int i = 0; i < codes.Length; i++)
                {
                    // 代码转换表达式树
                    syntaxTrees[i] = CSharpSyntaxTree.ParseText(codes[i]);
                }
            }
            catch (Exception ex)
            {
                Log.Warning(ex);
            }

            // 如果没有传入程序集名称则随机
            if (string.IsNullOrEmpty(assemblyName))
            {
                assemblyName = Path.GetRandomFileName();
            }

            // 引用
            List<PortableExecutableReference> references = new List<PortableExecutableReference>();
            // 获取当前项目运行环境所有程序集作为运行依赖
            foreach (var item in AppDomain.CurrentDomain.GetAssemblies())
            {
                try
                {
                    PortableExecutableReference portable = MetadataReference.CreateFromFile(item.Location);
                    references.Add(portable);
                }
                catch (NotSupportedException)
                {
                    Log.Information($"不支持创建引用：{item.FullName}");
                }
            }

            assemblyCode = null;

            // 创建编译对象
            CSharpCompilation compilation = CSharpCompilation.Create(assemblyName, syntaxTrees, references, new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary));

            using (var ms = new MemoryStream())
            {
                // 将编译好的IL代码放入内存流
                EmitResult result = compilation.Emit(ms);
                // 编译失败，提示
                if (result.Success)
                {
                    // 从内存中加载程序集
                    ms.Seek(0, SeekOrigin.Begin);
                    assemblyCode = ms.ToArray();
                    assembly = Assembly.Load(assemblyCode);
                }
                else
                {
                    IEnumerable<Diagnostic> failures = result.Diagnostics.Where(diagnostic =>
                               diagnostic.IsWarningAsError ||
                               diagnostic.Severity == DiagnosticSeverity.Error);
                    foreach (Diagnostic diagnostic in failures)
                    {
                        Log.Warning(string.Format("编译失败，{0}: {1}", diagnostic.Id, diagnostic.GetMessage()));
                    }
                }
            }

            return assembly;
        }

    }
}
