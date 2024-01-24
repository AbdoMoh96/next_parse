'use client'
import React,{ useState } from 'react';
import Parse from 'parse';
import {Select, Button, InputNumber} from "antd";
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";
import swal from 'sweetalert';
import LogoutButton from "@/Components/LogoutButton/LogoutButton";
import orderItemType from "@/app/orders/request/Types/orderItemType";

interface propTypes {}

const CreateTodoPage: React.FC<propTypes> = () => {
    const [select, onSelectChange] = useState<string>('');
    const [amount, onAmountChange] = useState<number | null>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [orderitems, setOrderItems] = useState<orderItemType[]>([]);

    ParseProvider({});

    const createOrderItem = () => {
        setOrderItems([...orderitems, {item_name: select, amount: amount}]);
        onSelectChange('');
        onAmountChange(0);
    }

    const requestOrder = () => {
        setIsLoading(true);
        orderitems.forEach(item => {
            const order = new Parse.Object('orders');
            order.set('item_name', item.item_name);
            order.set('amount', item.amount);
            order.save();
        });
        setOrderItems([]);
        setIsLoading(false);
        swal({
            title: "Success!",
            text: "order Created Successfully!!",
            icon: "success",
        });
    }

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <>
            <LogoutButton/>
            <div className="container">
                <div className="form_container">
                    <div style={{display:"flex", justifyContent: "space-between"}}>
                        <Select
                            style={{width: "70%"}}
                            showSearch
                            placeholder="Select an item"
                            value={select}
                            optionFilterProp="children"
                            onChange={onSelectChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                                {
                                    value: 'Burger',
                                    label: 'Burger',
                                },
                                {
                                    value: 'steak',
                                    label: 'steak',
                                },
                                {
                                    value: 'sushi',
                                    label: 'sushi',
                                },
                            ]}
                        />
                        <InputNumber value={amount} min={0} defaultValue={0} onChange={onAmountChange} />
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem"}}>
                        <Button loading={isLoading} type="primary" onClick={() => createOrderItem()}>Add Item</Button>
                        <Button loading={isLoading} type="primary" onClick={() => requestOrder()}>Request Order</Button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CreateTodoPage;