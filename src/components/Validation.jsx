import Input from "./Input";

function handleSubmit() {
  alert("Hi");
}

export default function Validation() {
  return (
    <form onSubmit={handleSubmit}>
      <h2>User Details</h2>
      <div className="control-row">
        <Input label="First Name" id="firstName" name="firstName" />
        <Input label="Last Name" id="lastName" name="lastName" />
        <Input label="Phone Number" id="phoneNumber" name="phoneNumber" />
        <Input label="Email" id="email" name="email" />
      </div>
      <p className="form-actions">
        <button className="button">Validation</button>
      </p>
    </form>
  );
}
