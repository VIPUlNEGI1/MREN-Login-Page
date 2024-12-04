import { Check, X } from "lucide-react";

// Component to display password criteria and whether each criterion is met
const PasswordCriteria = ({ password }) => {
    // Define the criteria to check for the password
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contains a lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contains a number", met: /\d/.test(password) },
        { label: "Contains a special character", met: /[^A-Za-z0-9]/.test(password) },
    ];
    
    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <Check className="size-4 text-green-500 mr-2" />
                    ) : (
                        <X className="size-4 text-gray-500 mr-2" />
                    )}
                    <span className={item.met ? "text-green-500" : "text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// Component to display password strength meter
const PasswordStrengthMeter = ({ password }) => {
    // Function to calculate the strength of the password
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z\d]/)) strength++;
        return strength; // Return the strength value
    };

    // Get the strength of the password
    const strength = getStrength(password);

    // Function to get the color based on the strength
    const getColor = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        if (strength === 3) return "bg-yellow-400";
        return "bg-green-500"; // Default color for maximum strength
    };

    // Function to get the text based on the strength
    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Strong";
        return "Very Strong"; // Default text for maximum strength
    };

    return (
        <div className="mt-2">
            <div className="flex justify-center items-center mb-1">
                <span className="text-xs text-gray-400">Password strength</span>
                <span className="text-xs text-gray-400">{getStrengthText(strength)}</span>
            </div>
            <div className="flex space-x-1">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300
                        ${index < strength ? getColor(strength) : "bg-gray-600"}`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;