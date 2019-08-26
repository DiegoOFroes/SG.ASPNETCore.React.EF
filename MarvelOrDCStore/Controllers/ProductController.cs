using BusinessLibrary.Model;
using BusinessLibrary.Service;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MarvelOrDCStore.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService iProductService;

        public ProductController(IProductService productService)
        {
            iProductService = productService;
        }

        [HttpGet]
        [Route("api/Product/Index")]
        public async Task<IActionResult> Product()
        {
            return Ok(await iProductService.GetProducts());
        }

        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            return Ok(await iProductService.GetProductData(id));
        }

        [HttpPost]
        [Route("api/Product/CreateProduct")]
        public async Task<IActionResult> CreateProduct(ProductModel model)
        {
            return Ok(await iProductService.SaveProduct(model));
        }

        [HttpPost]
        [Route("api/Product/EditProduct")]
        public async Task<IActionResult> EditProduct(ProductModel model)
        {
            return Ok(await iProductService.SaveProduct(model));
        }

        [HttpDelete]
        [Route("api/Product/DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            return Ok(await iProductService.DeleteProduct(id));
        }
    }
}
