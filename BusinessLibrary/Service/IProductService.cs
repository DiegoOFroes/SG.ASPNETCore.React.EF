using BusinessLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLibrary.Service
{
    public interface IProductService
    {
        Task<List<ProductModel>> GetProducts();
        Task<ProductModel> GetProductData(int productId);
        Task<bool> SaveProduct(ProductModel product);
        Task<bool> DeleteProduct(int productId);
    }
}
