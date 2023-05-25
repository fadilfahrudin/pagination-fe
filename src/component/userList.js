import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);
	const [pages, setPages] = useState(0);
	const [rows, setRows] = useState(0);
	const [keyword, setKeyword] = useState("");
	const [query, setQuery] = useState("");
	const [pageNotif, setPageNotif] = useState("");

	useEffect(() => {
		getUsers();
	}, [page, keyword]);

	const getUsers = async () => {
		const response = await axios.get(
			`http://localhost:5000/api/users?search_query=${keyword}&page=${page}&limit=${limit}`
		);
		setUsers(response.data.result);
		setPage(response.data.page);
		setPages(response.data.totalPage);
		setRows(response.data.totalRows);
	};

	const pageChange = ({ selected }) => {
		setPage(selected);
		if (selected === 9) {
			setPageNotif("Please use spesification data instead search");
		} else {
			setPageNotif("");
		}
	};

	const searchData = (e) => {
		e.preventDefault();
		setPage(0);
		setKeyword(query);
	};

	return (
		<div className='container mt-5 '>
			<div className='col'>
				<div className='row mx-auto'>
					<form onSubmit={searchData}>
						<div className='mb-3 input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Find something here..'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button className='btn btn-outline-secondary' type='submit'>
								Search
							</button>
						</div>
					</form>
					<table className='table table-secondary table-striped table-bordered'>
						<thead className='table-dark'>
							<tr>
								<th scope='col'>ID</th>
								<th scope='col'>Nama</th>
								<th scope='col'>Email</th>
								<th scope='col'>Gender</th>
								<th scope='col'>Action</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => (
								<tr key={index}>
									<th scope='row'>{user.id}</th>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.gender}</td>
									<td>
										<button className='btn btn-info'>Edit</button>
										<button className='btn btn-danger'>Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<p>
						Rows: {rows} Page: {rows ? page + 1 : 0} of Total Page : {pages}{" "}
					</p>
					<p className='text-danger text-center'>{pageNotif}</p>
					<nav aria-label='pagination' key={rows}>
						<ReactPaginate
							previousLabel={"< prev"}
							nextLabel={"next >"}
							pageCount={Math.min(10, pages)}
							onPageChange={pageChange}
							containerClassName={"pagination justify-content-center"}
							pageLinkClassName={"page-link"}
							pageClassName={"page-item"}
							previousLinkClassName={"page-link"}
							nextLinkClassName={"page-link"}
							activeLinkClassName={"active"}
							disabledLinkClassName={"disabled"}
						/>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default UserList;
