using GIGMWEB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GigmMobile.GigmService
{
    interface IGigmsService
    {
        DepartureTerminals getDepartureTerminals();
        DestinationTerminals getDestinationTerminal();

    }
}
