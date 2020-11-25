using System.IO;
using System.Text;
using System.Xml;

namespace GIGMWEB.Helper
{
    public class CreateStringedXmlFormat
    {
        public string CreateXml<T>(T response)
        {

            System.Xml.Serialization.XmlSerializer serializer = new System.Xml.Serialization.XmlSerializer(typeof(T));

            XmlWriterSettings settings = new XmlWriterSettings();
            settings.Encoding = new UnicodeEncoding(false, false);
            settings.Indent = true;
            settings.OmitXmlDeclaration = true;

            using (StringWriter textWriter = new StringWriter())
            {
                using (XmlWriter xmlWriter = XmlWriter.Create(textWriter, settings))
                {
                    serializer.Serialize(xmlWriter, response);
                }
                return textWriter.ToString();
            }
        }
    }
}