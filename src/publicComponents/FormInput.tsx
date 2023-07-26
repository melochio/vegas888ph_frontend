import React from 'react';
const Style = {
    padding: '8px',
}
const FormInput = ({ label, type, options, placeholder }: { label: string, type: string, options: string[], placeholder: string) => { 
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormInput({...formInput, [event.currentTarget.name] : event.currentTarget.value})
    }
    if (type === 'select') { 
        return (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <label htmlFor="selectInput" className="form-label">{label}</label>
                <select
                    className="form-control"
                    id="selectInput"
                    defaultValue=""
                    style={Style}
                    onChange={handleInput}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    } else if (type === 'text') {

        return (
            //   <div className="form-group">
            //     <label htmlFor="textInput" className="form-label">{label}</label>
            //     <input
            //       type={type || 'text'}
            //       className="form-control"
            //       id="textInput"
            //       placeholder={placeholder}
            //     />
            //   </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <label htmlFor="textInput" className="form-label">{label}</label>
                <input
                    type={type || 'text'}
                    style={Style}
                    className="form-control"
                    id="textInput"
                    placeholder={placeholder}
                />
            </div>
        );
    } else if (type === 'money') {
        const [money, setMoney] = React.useState('');
        const moneyStyle = {
            textAlign: 'right',
            padding: '8px',
        }
        const handleMoneyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            const numericValue = value.replace(/[^0-9.]/g, '');

            // Format the numeric value as money (e.g., 1234.56 -> $1,234.56)
            const formattedValue = new Intl.NumberFormat('en-US').format(parseFloat(numericValue));

            setMoney(formattedValue)
        }
        return (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <label htmlFor="textInput" className="form-label">{label}</label>
                <input
                    onChange={(event) => handleMoneyInput(event)}
                    type={type || 'text'}
                    className="form-control"
                    id="textInput"
                    placeholder={placeholder}
                    value={money}
                    style={{
                        textAlign: 'right',
                        padding: '8px',
                    }}
                />
            </div>
        );
    }
};

export default FormInput;
