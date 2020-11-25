using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GIGMWEB.Models
{
    public static class Extension
    {
        public static string ToArrayString<T>(this IEnumerable<T> collections)
        {
            var toReturn = "";
            if (collections.Any())
            {
                var collectionsArray = collections.ToArray();
                var joinedString = string.Join(",", collectionsArray);
                toReturn = $"[{joinedString}]";
            }
            return toReturn;
        }

    }
    
}