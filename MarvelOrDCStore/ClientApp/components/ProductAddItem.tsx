import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProductListData } from './ProductList';

interface AddProductRecordState {
    title: string;
    loading: boolean;
    productList: ProductListData;
}

export class ProductAddItem extends React.Component<RouteComponentProps<{}>, AddProductRecordState> {
    constructor(props) {
        super(props);

        //here we are intializing the interface's fields with default values.
        this.state = { title: "", loading: true, productList: new ProductListData };

        //the productid variable will get the product id from URL.
        var productid = this.props.match.params["productid"];

        //if productid is greater than 0 then fetch method will get the specific product record and display it as in edit mode.
        if (productid > 0) {
            fetch('api/Product/Details/' + productid)
                .then(response => response.json() as Promise<ProductListData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, productList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, productList: new ProductListData };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }

    //this method will render html onto the DOM.
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Product</h3>
            <hr />
            {contents}
        </div>;
    }

    //this method will save the record into database. If the URL has an ProductId,
    //then it will update the record and if the URL has not product Id parameter than it will save the record.
    private FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit product.
        if (this.state.productList.productID) {
            fetch('api/Product/EditProduct', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/productList");
                })
        }
        else {
            fetch('api/Product/CreateProduct', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/productList");
                })
        }
    }

    private FuncCancel(e: any) {
        e.preventDefault();
        this.props.history.push("/productList");
    }

    private validateNumber(e: any) {
        let input = String.fromCharCode(e.charCode);
        const reg = /^\d*(?:[.,]\d{1,2})?$/;

        if (!reg.test(input)) {
            e.preventDefault();
        }
    }

    //this method will return the html table to display all the product record with edit and delete methods.
    private renderCreateForm() {
        return (
            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="ProductId" value={this.state.productList.productID} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="ProductName">Product Name</label>
                    <div className="col-md-4">
                        <input className="form-control" name="ProductName" type="text" defaultValue={this.state.productList.productName} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ItemQuantity">Quantity</label>
                    <div className="col-md-4">
                        <input className="form-control" name="ItemQuantity" type="text" placeholder="0.00" defaultValue={this.state.productList.itemQuantity} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="UnitPrice">Unit Price</label>
                    <div className="col-md-4">
                        <input className="form-control" name="UnitPrice" type="text" placeholder="0.00" defaultValue={this.state.productList.unitPrice} required />
                    </div>
                </div>

                <div className="form-group">
                    <td> <button type="submit" className="btn btn-success btn-block btn-md">Save</button> </td>
                    <td> <button className="btn btn-default btn-block btn-md" onClick={this.FuncCancel}>Cancel</button> </td>
                </div >
            </form >
        )
    }
}