import React,{useState,useEffect} from "react";
import axios from 'axios';
import '../styles/InventoryTable.css'

function InventoryTable(){
    const[FormData,setFormData] = useState({
        item:'',
        ID : 0,
        quantity : 0
    });

    const[RemoveData,setRemoveData] = useState({
        ID : 0
    });
    const [rows,setRows] = useState([]);
    function HandleRemove(e){
        setRemoveData({
            ...RemoveData,
            [e.target.name]: e.target.value
        });
    }
    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/remove', RemoveData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
    }
    };
    function HandleChange(e){
        setFormData(
            {
                ...FormData,
                [e.target.name]: e.target.value
            }
        );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/form', FormData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
    }
    };

    useEffect(()=>{
        axios.get('http://localhost:5000/fetch')
        .then(response => {
            setRows(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    },[]);
    return (
        <div className="InventoryBody">
            <div className="table">
            <table className="inventorytableclass">
            <thead>
                <th>S.No</th>
                <th>Item</th>
                <th>Quantity</th>
            </thead>
            <tbody className="scrollable-tbody">
                {rows.map((row,index)=>(
                    <tr key={index} className="billingrow">
                        <td>
                            <input
                                className='Inventorydisp' 
                                type = "number"
                                value={row.id}
                            />
                        </td>
                        <td>
                            <input
                                className='Inventorydisp' 
                                type = "text"
                                value={row.username}
                            />
                        </td>
                        <td>
                            <input
                                className='Inventorydisp' 
                                type = "number"
                                value={row.quantity}
                            />
                        </td>
                        </tr>
                ))}
            </tbody>
        </table>
        </div>
        <div className="inventorybuttonclass">
        </div>
        <div >
            <form onSubmit={handleSubmit} className="InventoryInput" >
            
            <label for='item'>Item</label>
            <input type='text' name='item' placeholder="Enter Item" onChange={HandleChange} className="InventoryInput" value={FormData.name} required/>
            
            <label for='quantity'>Quantity</label>
            <input type='text' name='quantity' placeholder="Enter Quantity" onChange={HandleChange} className="InventoryInput" value={FormData.quantity} required/>
        
            <label for='ID'>ID</label>
            <input type='text' name="ID" placeholder="Enter ID" className="InventoryInput" onChange={HandleChange} value={FormData.ID} required/>
            
            <button type="submit">Add Item</button>
            </form>
        </div>
        <div>
            <form className="InventoryInput" onSubmit={handleRemove}>
                <label for='ID'>ID</label>
                <input type='text' name="ID" placeholder="Enter ID to remove" className="remove" onChange={HandleRemove} value={RemoveData.ID} required/>
                <button className="buttons" type="submit">Remove</button>
            </form>
        </div>
        </div>
    )
}

export default InventoryTable;