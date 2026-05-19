const setupPasswordTemplate = ({ name, setupLink }) => {
    return `
        <div style="font-family: Arial, sans-serif;">
            <h2>Welcome to Healthcare System</h2>

            <p>Hello Dr. ${name},</p>

            <p>Your doctor account has been created successfully.</p>

            <p>
                Click below button to setup your password:
            </p>

            <a 
                href="${setupLink}"
                style="
                    background:#1976d2;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;
                    display:inline-block;
                "
            >
                Set Password
            </a>

            <p>
                This link will expire in 30 minutes.
            </p>

            <br/>

            <p>Healthcare Team</p>
        </div>
    `;
};

module.exports = setupPasswordTemplate;