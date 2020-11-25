using System;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Mail;
using GIGMWEB;

/// <summary>
/// Summary description for clsemail
/// </summary>
/// 

public class clsemail
{
    private string sLogFormat;
    private string sErrorTime;

    System.Configuration.AppSettingsReader configurationAppSettings = new System.Configuration.AppSettingsReader();
    public clsemail()
    {
        //
        // TODO: Add constructor logic here
        //
    }
   
    public static string ReadFromFile(string FileName)
    {
        string tempReadFromFile = null;
        try
        {
            StreamReader objStreamReader = null;
            string strLine = null;

            //Pass the file path and the file name to the StreamReader constructor.
            objStreamReader = new StreamReader(FileName);

            //Read the first line of text.
            strLine = objStreamReader.ReadToEnd();
            tempReadFromFile = strLine;

            //Close the file.
            objStreamReader.Close();
        }
        catch (Exception ex)
        {
            return "";
        }
        return tempReadFromFile;
    }
  
    public static bool SendEmail(string ToAddress, string Subject, string Message, string username)
    {
        try
        {
            MailMessage mail = new MailMessage();
            var smtpservername = "mail.gigm.com";
            var password = "God1$G00dS!te";
            string mailsender = string.Empty;
            mail.Sender = new MailAddress(username);
            mail.From = new MailAddress(username);
            mailsender = (username);
            mail.To.Add(new MailAddress(ToAddress));
            mail.Subject = (Subject);
            mail.IsBodyHtml = true;
            mail.Body = (Message);
            mail.Priority = MailPriority.High;

            SmtpClient mailclient = new SmtpClient();
            mailclient.EnableSsl = false;
            NetworkCredential NetworkCred = new NetworkCredential(username, password);
            mailclient.UseDefaultCredentials = true;
            mailclient.Credentials = NetworkCred;
            mailclient.Port = 26;
            mailclient.Host = smtpservername;
            mailclient.Send(mail);
        }
        catch (Exception ex)
        {
            //logic.saveerrorlog(1, "clsemail", ex.ToString, "sendemailnotification")
            return false;
        }
        return true;

    }
    public static void LogError(Exception ex)
    {
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
        message += Environment.NewLine;
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        message += string.Format("Message: {0}", ex.Message);
        message += Environment.NewLine;
        message += string.Format("StackTrace: {0}", ex.StackTrace);
        message += Environment.NewLine;
        message += string.Format("Source: {0}", ex.Source);
        message += Environment.NewLine;
        message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
        message += Environment.NewLine;
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        string path = "~/ErrorLog/ErrorLog.txt";
        using (StreamWriter writer = new StreamWriter(path, true))
        {
            writer.WriteLine(message);
            writer.Close();
        }
    }

    public static void Logdetails(string ex)
    {
        string mydate = "data" + DateTime.Now.ToString("MM-dd-yyyy")+".txt";
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
        message += Environment.NewLine;
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        message += string.Format("Message: {0}", ex);
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        string path = System.Configuration.ConfigurationManager.AppSettings["Systempath"] + mydate;
        //string path = "C:\\Users\\Kenneth\\Documents\\Visual Studio 2015\\Projects\\GIGMWEB\\GIGMWEB\\glog\\" + mydate;

        using (StreamWriter writer = new StreamWriter(path, true))
        {
            writer.WriteLine(message);
            writer.Close();
        }
    }
    public static void campdirect(string ex)
    {
        string mydate = "camp" + DateTime.Now.ToString("MM-dd-yyyy") + ".txt";
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
        message += Environment.NewLine;
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        message += string.Format("Message: {0}", ex);
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        string path = System.Configuration.ConfigurationManager.AppSettings["Systempath"] + mydate;
        //string path = "C:\\inetpub\\wwwroot\\deployed\\glog\\" + mydate;
        using (StreamWriter writer = new StreamWriter(path, true))
        {
            writer.WriteLine(message);
            writer.Close();
        }
    }

    public static void log_ex(string ex)
    {
        string mydate = "ex" + DateTime.Now.ToString("MM-dd-yyyy") + ".txt";
        string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
        message += Environment.NewLine;
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        message += string.Format("Message: {0}", ex);
        message += "-----------------------------------------------------------";
        message += Environment.NewLine;
        
        string path = System.Configuration.ConfigurationManager.AppSettings["Systempath"]  + mydate;
        //string path = "C:\\inetpub\\wwwroot\\deployed\\glog\\" + mydate;
        using (StreamWriter writer = new StreamWriter(path, true))
        {
            writer.WriteLine(message);
            writer.Close();
        }
    }

}