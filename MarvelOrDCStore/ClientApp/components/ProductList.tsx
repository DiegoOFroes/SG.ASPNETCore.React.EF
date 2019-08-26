import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface ProductRecordState {
    productListData: ProductListData[];
    loading: boolean;
}

//here declaring the ProductList class. And this ProductList class inherits the abstract class React.Component
export class ProductList extends React.Component<RouteComponentProps<{}>, ProductRecordState> {

    //Declaring the constructor 
    constructor() {

        //here we are calling base class constructor using super()
        super();

        //here we are intializing the interface's fields using default values.
        this.state = { productListData: [], loading: true };

        //this fetch method is responsible to get all the product record using web api.
        fetch('api/Product/Index')
            .then(response => response.json() as Promise<ProductListData[]>)
            .then(data => {
                this.setState({ productListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
        this.FuncAdd = this.FuncAdd.bind(this);
    }

    // this method will be responsible for deleting the product record.
    private FuncDelete(item: ProductListData) {
        if (!confirm("Do you want to delete product: " + item.productName))
            return;
        else {
            //this fetch method will get the specific product record using product id.
            fetch('api/Product/DeleteProduct/' + item.productID, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        productListData: this.state.productListData.filter((rec) => {
                            return (rec.productID != item.productID);
                        })
                    });
            });
        }
    }

    //this method will responsible for editing the specific product record.
    private FuncEdit(id: number) {
        this.props.history.push("/product/edit/" + id);
    }

    private FuncAdd(e: any) {
        e.preventDefault();
        this.props.history.push("/productAddItem");
    }

    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProductTable(this.state.productListData);
        return <div>
            <h2>Manage Products</h2>
            <br />
            <td width="100">
                <button className="btn btn-primary btn-block btn-md" onClick={this.FuncAdd}>Create New</button>
            </td>
            {contents}
        </div>;
    }

    //this method will return the html table to display all the product record with edit and delete methods.
    private renderProductTable(productListData: ProductListData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                </tr>
            </thead>
            <tbody>
                {productListData.map(item =>
                    <tr key={item.productID}>
                        <td >{item.productName}</td>
                        <td >{item.itemQuantity}</td>
                        <td >{item.unitPrice}</td>
                        <td width="100">
                            <button className="btn btn-info btn-block btn-md" onClick={(id) => this.FuncEdit(item.productID)}>Edit</button>
                        </td>
                        <td width="100">
                            <button className="btn btn-danger btn-block btn-md" onClick={(id) => this.FuncDelete(item)}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

//here we are declaring a class which have the same properties as we have in model class.
export class ProductListData {
    productID: number = 0;
    productName: string = "";
    itemQuantity: string = "";
    unitPrice: string = "";
}