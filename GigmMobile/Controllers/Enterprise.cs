using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GigmMobile.Controllers
{
    public class EnterpriseController : Controller
    {
   

		public ActionResult Index()
		{

			ViewBag.Title = "Enterprise Page";
			return View();
		}

	
	}
}