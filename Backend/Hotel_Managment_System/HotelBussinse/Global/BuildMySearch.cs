using HotelDataAceess.Entiteis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HotelBussinse.Global
{
    public class BuildMySearch<T>
    {
        public static Expression<Func<T, bool>> BuildPredicate(string propertyName, string operation, string value)
        {
            var parameter = Expression.Parameter(typeof(T), "p");
            var property = Expression.Property(parameter, propertyName);
            object typedValue;

            if (property.Type.IsEnum)
            {
                typedValue = Enum.Parse(property.Type, value.ToString(), ignoreCase: true);
            }
            else
            {
                typedValue = Convert.ChangeType(value, property.Type);
            }

            var constant = Expression.Constant(typedValue, property.Type);

            Expression body;

            switch (operation)
            {
                case "==":
                    body = Expression.Equal(property, constant);
                    break;
                case ">":
                    body = Expression.GreaterThan(property, constant);
                    break;
                case "<":
                    body = Expression.LessThan(property, constant);
                    break;
                case "StartsWith":
                    if (property.Type != typeof(string))
                        throw new InvalidOperationException($"Operation 'StartsWith' can only be applied to string properties.");

                    body = Expression.Call(property, typeof(string).GetMethod("StartsWith", new[] { typeof(string) }), constant);
                    break;
                default:
                    throw new NotSupportedException($"Operation '{operation}' is not supported.");
            }

            return Expression.Lambda<Func<T, bool>>(body, parameter);
        }
    }
}
