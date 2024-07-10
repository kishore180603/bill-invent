import React,{useState,useEffect} from "react";
import axios from 'axios';
import '../styles/BillBody.css';

function Billing(){
    const [rows,setRows] = useState([
        {id:1,item:'',quantity:0,price:0,pricekgpc:0}
    ]);
    const [Total,setTotal] = useState(0);

    const [suggestions,setSuggestion] = useState([]);

    const handleChange = (index,key,value)=>{
        const Updatedrows = [...rows];
        Updatedrows[index][key] = value;
        Updatedrows[index]['price'] = Updatedrows[index]['quantity'] * Updatedrows[index]['pricekgpc'];
        var tot = 0;
        for(var i=0;i<rows.length;i++){
            tot+=Updatedrows[i]['price'];
        }
        setTotal(tot);
        setRows(Updatedrows);
        if(key=='item'){
            if(Updatedrows[index][key].length>0){
            const fetchSuggestions = async ()=>{
                try{
                    const response = await axios.get(`/search?query=${Updatedrows[index][key]}`);
                    setSuggestion(response.data);
                }catch(error){
                    console.error('error fetching suggestions:',error);
                }
            };
            fetchSuggestions();
        }else{
            setSuggestion([]);
        }
        }
        if(index===rows.length-1){
            addRow();
        }
    }
    

    const addGST18 = ()=>{setTotal(Total*1.18);};
    const addGST24 = ()=>{setTotal(Total*1.24);};

    const printb = ()=>{
        window.print();
    };


    const addRow = ()=>{
        const newRow = {id:rows.length+1,item:'',quantity:0,price:0,pricekgpc:0};
        const Updatedrows = [...rows,newRow];
        setRows(Updatedrows);
    };

    const RemoveRow = (index)=>{
        const Updatedrows = rows.filter((_,rowIndex)=>rowIndex !== index);
        setRows(Updatedrows);
    }
    return(
        <div className="Billing">
        <div className="BillingBody">
            
        <table className="tableclass">
            <thead>
                <th>S.No</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price Per Kg/Pc</th>
                <th>Price</th>
            </thead>
            <tbody className="scrollable-tbody">
                {rows.map((row,index)=>(
                    <tr key={row.id} className="billingrow" onDoubleClick={()=>RemoveRow(index)}>
                        <td>
                            <input
                                className="BillInput sno" 
                                type = "text"
                                value={row.id}
                                onChange={(e)=>handleChange(index,'sno',e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="BillInput" 
                                type = "text"
                                value={row.item}
                                onChange={(e)=>handleChange(index,'item',e.target.value)}
                            />
                        </td>
                        {suggestions.length > 0 && (
                            <ul>
                            {suggestions.map((item, index) => (
                            <li key={index}>{item.name}</li>
                            ))}
                            </ul>
                        )}
                        <td>
                            <input
                                className="BillInput" 
                                type = "text"
                                value={row.quantity}
                                onChange={(e)=>handleChange(index,'quantity',e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="BillInput" 
                                type = "text"
                                value={row.pricekgpc}
                                onChange={(e)=>handleChange(index,'pricekgpc',e.target.value)}
                            />
                        </td>
                        <td>
                            <input
                                className="BillInput" 
                                type = "text"
                                value={row.price}
                                onChange={(e)=>handleChange(index,'price',e.target.value)}
                            />
                        </td>
                        </tr>
                ))}
            </tbody>
        </table>
        <div className="buttonclass">
        <button  onClick={addRow} className="button">Add Item</button>
        <button onClick={addGST24} className="button"> Add GST 24%</button>
        <button onClick={addGST18} className="button">Add GST 18%</button>
        <button onClick={printb} className="button">Print</button>
        </div>
        <h2>Total :{Total}</h2>
        <p>Thanks!visit again</p>
        </div>
        
        </div>
    )
}

export default Billing;