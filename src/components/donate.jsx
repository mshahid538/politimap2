import React, { useState } from 'react';
import { Button, View, Text, SelectField, TextField } from '@aws-amplify/ui-react';

const Donate = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');

    const handleDonateClick = () => setShowDropdown(true);

    const handleDonate = () => {
        const amount = selectedAmount === 'Other' ? customAmount : selectedAmount;
        alert(`Thank you for donating $${amount || 'an unspecified amount'}!`);
    };

    return (
        <View
            padding="20px"
            borderRadius="8px"
            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
            backgroundColor="#f7f7f7"
            textAlign="center"
            maxWidth="400px"
            margin="auto"
        >
            <Text fontSize="18px" fontWeight="bold" marginBottom="10px">
                Make a Difference Today
            </Text>
            <Text fontSize="14px" color="#6b7280" marginBottom="10px">
                Your support helps us drive meaningful change. Every contribution, big or small, makes an impact!
            </Text>
            {!showDropdown ? (
                <Button variation="primary" onClick={() => handleDonateClick() }>
                    Donate Now
                </Button>
            ) : (
                <View>
                    <SelectField
                        label="Select Donation Amount"
                        placeholder="Choose an amount"
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(e.target.value)}
                        marginBottom="10px">

                        <option value={10}>$10.00</option>
                        <option value={100}>$100.00</option>
                        <option value={1000}>$1,000.00</option>
                        <option value={2500}>$2,500.00</option>
                        <option value={3300}>$3,300.00</option>
                        <option value={"Other"}>Other</option>
        
                    </SelectField>
                    {selectedAmount === 'Other' && (
                        <TextField
                            label="Enter Custom Amount"
                            placeholder="Enter amount (e.g., 50.00)"
                            type="number"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            marginBottom="10px"
                        />
                    )}
                    <Button variation="primary" onClick={handleDonate}>
                        Confirm Donation
                    </Button>
                </View>
            )}
        </View>
    );
};

export default Donate;
