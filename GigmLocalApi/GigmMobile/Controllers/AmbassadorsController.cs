using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GigmMobile.Controllers
{
    public class AmbassadorsController : Controller
    {
        // GET: Ambassadors
        public ActionResult Index()
        {
			ViewBag.Title = " Campus Ambassadors &mdash; GIGM Ambassadors For Universities across Nigeria";
            return View();
        }
		public ActionResult Login()
		{

			ViewBag.Title = "Login Page";
			return View();
		}
		public ActionResult Register()
		{

			ViewBag.Title = "Register";
			return View();
		}
		public ActionResult Dashboard()
		{

			ViewBag.Title = "Register";
			return View();
		}
	}
}