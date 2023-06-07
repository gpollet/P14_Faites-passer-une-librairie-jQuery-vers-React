import { NavLink } from "react-router-dom";
import EmployeeCreationForm from "../components/EmployeeCreationForm";

const Home = () => {
	return (
		<>
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<NavLink to={"/employee-list"}>View Current Employees</NavLink>
				<a href="employee-list.html"></a>
				<h2>Create Employee</h2>
				<EmployeeCreationForm />

				<button 
        //onClick="saveEmployee()"
        >Save</button>
			</div>
			{/*<div id="confirmation" className="modal">
				Employee Created!
			</div>*/}
		</>
	);
};

export default Home;