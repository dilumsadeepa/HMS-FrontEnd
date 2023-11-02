import React from 'react';

const DashboardTables = () => {
    return (
        <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold">Resource Info</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 text-nowrap">
              <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable">
                <label className="form-label">
                  Show&nbsp;
                  <select className="d-inline-block form-select form-select-sm">
                    <option value="10" selected>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  &nbsp;
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-md-end dataTables_filter" id="dataTable_filter">
                <label className="form-label">
                  <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" />
                </label>
              </div>
            </div>
          </div>
          <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <table className="table my-0" id="dataTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Office</th>
                  <th>Age</th>
                  <th>Start date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img className="rounded-circle me-2" width="30" height="30" src="assets/img/avatars/avatar1.jpeg" alt="User Avatar" />
                    Airi Satou
                  </td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>33</td>
                  <td>2008/11/28</td>
                  <td>$162,700</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Name</strong></td>
                  <td><strong>Position</strong></td>
                  <td><strong>Office</strong></td>
                  <td><strong>Age</strong></td>
                  <td><strong>Start date</strong></td>
                  <td><strong>Salary</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="row">
            <div className="col-md-6 align-self-center">
              <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
                Showing 1 to 10 of 27
              </p>
            </div>
            <div className="col-md-6">
              <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a className="page-link" aria-label="Previous" href="#">
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" aria-label="Next" href="#">
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashboardTables;