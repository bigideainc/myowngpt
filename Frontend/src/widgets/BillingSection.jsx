import { faBitcoin, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Card,
    CardBody,
    Checkbox,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import React, { useState } from 'react';

const BillingSection = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [depositAmount, setDepositAmount] = useState(300);
    const [depositCurrency, setDepositCurrency] = useState('EUR');

    const handlePaymentMethodChange = (event) => {
        const { id, value } = event.target;
        setPaymentMethod(value);
        console.log(`Selected Payment Method: ${id} - ${value}`);
    };

    return (
        <div className="flex ml-64 justify-center p-6 mt-16">
            <Card className="w-full max-w-5xl p-6 flex flex-row bg-green-50">
                <div className="w-1/2 pr-6">
                    <Typography variant="h5" color="blue-gray" className="mb-4">
                        Select Payment Method
                    </Typography>
                    <CardBody className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="card"
                                    name="paymentMethod"
                                    color="blue"
                                    value="card"
                                    onChange={handlePaymentMethodChange}
                                    checked={paymentMethod === 'card'}
                                />
                                <label htmlFor="card" className="flex items-center ml-2">
                                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                                    Debit or credit card
                                </label>
                                <Typography className="ml-2">All major cards accepted</Typography>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="paypal"
                                    name="paymentMethod"
                                    color="blue"
                                    value="paypal"
                                    onChange={handlePaymentMethodChange}
                                    checked={paymentMethod === 'paypal'}
                                />
                                <label htmlFor="paypal" className="flex items-center ml-2">
                                    <FontAwesomeIcon icon={faPaypal} className="mr-2" />
                                    PayPal
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="crypto"
                                    name="paymentMethod"
                                    color="blue"
                                    value="crypto"
                                    onChange={handlePaymentMethodChange}
                                    checked={paymentMethod === 'crypto'}
                                />
                                <label htmlFor="crypto" className="flex items-center ml-2">
                                    <FontAwesomeIcon icon={faBitcoin} className="mr-2" />
                                    Cryptocurrency (Coinbase)
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="bank"
                                    name="paymentMethod"
                                    color="blue"
                                    value="bank"
                                    onChange={handlePaymentMethodChange}
                                    checked={paymentMethod === 'bank'}
                                />
                                <label htmlFor="bank" className="flex items-center ml-2">
                                    <FontAwesomeIcon icon={faUniversity} className="mr-2" />
                                    Bank transfer
                                </label>
                            </div>
                        </div>
                    </CardBody>
                </div>
                <div className="w-1/2 pl-6">
                    <div className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <Typography variant="small" color="blue-gray">Deposit currency</Typography>
                            <Select
                                id="depositCurrency"
                                value={depositCurrency}
                                onChange={(e) => setDepositCurrency(e)}
                                className="min-w-[120px]"
                            >
                                <Option value="EUR">EUR</Option>
                                <Option value="USD">USD</Option>
                                <Option value="GBP">GBP</Option>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Typography variant="small" color="blue-gray">Deposit amount</Typography>
                            <Input
                                id="depositAmount"
                                type="number"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                className="min-w-[120px]"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <Typography variant="small" color="blue-gray">Processing fee</Typography>
                                <Typography variant="small" color="blue-gray">€0.00</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography variant="small" color="blue-gray">Total</Typography>
                                <Typography variant="small" color="blue-gray">€{depositAmount}</Typography>
                            </div>
                        </div>
                        <Button color="red" className="w-full">
                            Confirm and pay €{depositAmount}
                        </Button>
                        <Typography variant="small" color="gray" className="text-center mt-4">
                            * You agree that your deposit is non-refundable!<br />
                            * Usually the payment is confirmed in few minutes, but it can take up to 3 hours.
                        </Typography>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BillingSection;
