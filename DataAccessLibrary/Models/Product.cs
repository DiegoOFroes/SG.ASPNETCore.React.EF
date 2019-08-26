using System.ComponentModel.DataAnnotations;

namespace DataAccessLibrary.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string ItemQuantity { get; set; }

        [Required]
        public string UnitPrice { get; set; }
    }
}
