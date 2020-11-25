using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GIGMWEB.Helper
{
    public class CreateOrderModel
    {
        public string OrderDescription { get; set; }
        public double Amount { get; set; }
        public string RefCode { get; set; }
        public string RedirectUrl { get; set; }
    }
}