using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLibrary.Model;
using DataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLibrary.Service
{
    public class ProductService : IProductService
    {
        public async Task<List<ProductModel>> GetProducts()
        {
            using (MarvelDCStoreDBContext db = new MarvelDCStoreDBContext())
            {
                return await (from a in db.Product.AsNoTracking()
                              select new ProductModel
                              {
                                  ProductID = a.ProductID,
                                  ProductName = a.ProductName,
                                  ItemQuantity = a.ItemQuantity,
                                  UnitPrice = a.UnitPrice
                              }).ToListAsync();
            }
        }

        public async Task<ProductModel> GetProductData(int productId)
        {
            using (MarvelDCStoreDBContext db = new MarvelDCStoreDBContext())
            {
                return await (from a in db.Product.AsNoTracking()
                              where a.ProductID.Equals(productId)
                              select new ProductModel
                              {
                                  ProductID = a.ProductID,
                                  ProductName = a.ProductName,
                                  ItemQuantity = a.ItemQuantity,
                                  UnitPrice = a.UnitPrice
                              }).FirstOrDefaultAsync();
            }
        }

        public async Task<bool> SaveProduct(ProductModel productModel)
        {
            using (MarvelDCStoreDBContext db = new MarvelDCStoreDBContext())
            {
                Product product = db.Product.Where(x => x.ProductID == productModel.ProductID).FirstOrDefault();

                if (product == null)
                {
                    product = new Product()
                    {
                        ProductName = productModel.ProductName,
                        ItemQuantity = productModel.ItemQuantity,
                        UnitPrice = productModel.UnitPrice
                    };

                    db.Product.Add(product);
                }
                else
                {
                    product.ProductName = productModel.ProductName;
                    product.ItemQuantity = productModel.ItemQuantity;
                    product.UnitPrice = productModel.UnitPrice;
                }

                return await db.SaveChangesAsync() >= 1;
            }
        }

        public async Task<bool> DeleteProduct(int productId)
        {
            using (MarvelDCStoreDBContext db = new MarvelDCStoreDBContext())
            {
                Product product = db.Product.Where(x => x.ProductID == productId).FirstOrDefault();

                if (product != null) db.Product.Remove(product);

                return await db.SaveChangesAsync() >= 1;
            }
        }
    }
}
