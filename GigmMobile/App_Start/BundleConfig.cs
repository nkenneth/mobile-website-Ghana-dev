using System.Web;
using System.Web.Optimization;

namespace GigmMobile
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.2.1.min.js", "~/Scripts/popper.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));


            bundles.Add(new ScriptBundle("~/bundles/library").Include(
                         "~/Scripts/array.js","~/Scripts/mdb.min.js","~/Scripts/select.js", "~/Scripts/sweetalert.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                          "~/Scripts/angular.min.js","~/Scripts/angular-animate.js", 
                          "~/Scripts/angular-route.js",
                          "~/Scripts/angular-sanitize.js",
                          "~/Scripts/angular-ui-router.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
                        "~/Scripts/plugins/moment.min.js", "~/Scripts/plugins/jquery.touchSwipe.min.js",
                        "~/Scripts/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js"));



            bundles.Add(new ScriptBundle("~/bundles/app").IncludeDirectory(
                   "~/app", "*.js", true));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            

            //bundles.Add(new ScriptBundle("~/bundles/fonts/*",
            //                     "~/font/*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap.min.css","~/Content/mdb.min.css",
                                "~/Content/font-awesone.min.css", "~/Content/select.css","~/Content/sweetalert.css",
                                "~/Content/select2.css","~/Content/selectize.default.css",
                                "~/Content/style.css", "~/Content/status.css", "~/Content/seat.css"));

       
        }
    }
}
