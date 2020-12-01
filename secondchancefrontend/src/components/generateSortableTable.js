import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {Payment_Form} from './payment/payment_form';
import {Button, Container, Modal} from 'react-bootstrap';
import {FullViewCase} from "./case_related/fullViewCase";
import {DrWritesSecondOpinion} from './case_related/drWritesSecondOpinion';
import 'bootstrap/dist/css/bootstrap.css';
const {SearchBar} = Search;

//Generates the layout for each type of case management table for user
export class GenerateSortableTable extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            parsedJSONObj: [], //this array will have everything parsedJSONObj and will include a url to caseID and cancel buttons
            error: null,
            showModal: false,
            record_assessment_id: null,
            showAssessmentPageModal: false,
            showFullCasePageModal: false,
            caseDetailForFullView: null
        };

        this.recordID = null;
        this.ShowAssessmentPageModalHandle = this.ShowAssessmentPageModalHandle.bind(this);
    }

    componentDidMount()
    {

    }

    handleModal(status, record_assessment_id)
    {


        this.setState({
            showModal: status,
            record_assessment_id: record_assessment_id
        })

    }

    CloseModalHandle()
    {
        //Closes the modal
        this.handleModal(false, null);
        //Refreshes Page
        //window.location.reload(false);
        this.LoadTables();

    }

    CaseCancellationHandle(record_assessment_id)
    {


        //send to backend this.state.parsedJSONObj.record_id for deletion

        //Call in fetch to delete case with id

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": record_assessment_id,
                                        "assessment": "", "status": "Cancelled"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text())
            .then(text => {
                this.LoadTables();
                console.log(text)});
        //Close Modal
        this.CloseModalHandle();
        //Refreshes page
        //window.location.reload(false);
        this.LoadTables();


    }


    ConfirmCancelButtonHandle(record_assessment_id)
    {
        //Ask user to confirm
        return(
            <div>

                <Modal show = {this.state.showModal}
                       size = {'xl'}
                >
                    <Modal.Header>
                        Are you sure you want to delete this case?

                    </Modal.Header>
                    <Modal.Body>
                        <Button onClick={()=>{this.CaseCancellationHandle(record_assessment_id)}}>Yes</Button>
                        <Button onClick={()=>{this.CloseModalHandle()}}>No</Button>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        )

    }

    componentDidMount() {
        this.LoadTables();
    }

    ShowFullCaseHandle(details)
    {
        this.setState(
            {
                showFullCasePageModal: !this.state.showFullCasePageModal,
                caseDetailForFullView: details
            }
        )
    }
    GetFullCaseView(details){
        console.log(details);
        return(<div>

            <Modal show = {this.state.showFullCasePageModal}
                   size = {'xl'}
            >

                <Modal.Header>
                    <h1>Full Case View</h1>
                    <Button style={{left: 0}}onClick={()=>{this.setState({showFullCasePageModal: !this.state.showFullCasePageModal})}}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <Container >
                        <FullViewCase caseDetails={this.state.caseDetailForFullView} />
                    </Container>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </div>);
        console.log("bye");
    }

    LoadTables()
    {
        fetch(this.props.incomingData.URL_for_Fetch, this.props.incomingData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    let l = result.length;
                    for (let i = 0; i < l; i++) {
                        result[i].viewFullCaseButton = <Button onClick={

                            ()=>{this.ShowFullCaseHandle(result[i], true)}
                        }>View Case</Button>

                        if (result[i].status == "pending" && this.props.is_patient) {
                            result[i].cancelButton = <Button onClick={() => {

                                this.handleModal(true, result[i].record_assessment_id)

                            }}>Cancel</Button>

                        }
                        else if (result[i].status == "pending" && !this.props.is_patient){
                            result[i].cancelButton = <Button onClick={() => {
                                this.handleModal(true, result[i].record_assessment_id)

                            }}>Cancel</Button>
                            result[i].acceptButton = <Button onClick={() => {
                                fetch("http://52.247.220.137/accept_pending_record",
                                    {
                                        method: 'PUT',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({"record_assessment_id": result[i].record_assessment_id})
                                    }).then(() => alert("accepted!"))
                                    .then(() => {
                                        this.LoadTables();
                                    });
                            }}>Accept</Button>
                        }
                        else if(result[i].status == "Awaiting Payment" && this.props.is_patient)
                        {
                            result[i].payButton = <Button onClick={() =>
                               <Payment_Form caseDetail={result[i]}/>
                            }>Pay</Button>

                        }
                        else if(result[i].status == "Diagnosing" && !this.props.is_patient) {

                            result[i].createAssessmentButton = <Button onClick={() => {
                                this.recordID = result[i].record_assessment_id;
                                this.setState(
                                    {
                                        showAssessmentPageModal: true
                                    }
                                )
                            }
                            }>Create Assessment</Button>
                        }

                    }
                    this.setState({
                        parsedJSONObj: result
                    })
                },

                (error) => {
                    console.log("Error with JSON retrieval for Client Ongoing Case Table.");
                    console.log(error.data);

                }
            );
    }

    ShowAssessmentPageModalHandle()
    {
        this.setState(
            {
                showAssessmentPageModal: !this.state.showAssessmentPageModal
            }
        )
    }

    render() {

        return (
            <div>
                {this.state.showFullCasePageModal && this.GetFullCaseView()}

                {this.ConfirmCancelButtonHandle(this.state.record_assessment_id)}
                <Container style={{background: `rgba(255, 255, 255, 0.9)`}}>
                    { this.state.showAssessmentPageModal &&
                        <DrWritesSecondOpinion recordID={this.recordID}
                                               phy_id={this.props.phy_id}
                                               showAssessmentPageModal={this.state.showAssessmentPageModal}
                                               ShowAssessmentPageModalHandle = {this.ShowAssessmentPageModalHandle}
                                               reload_tables={() => this.LoadTables()}
                                                                    />
                    }
                    <ToolkitProvider
                        keyField="id"
                        data={ this.state.parsedJSONObj }
                        columns={ this.props.incomingData.columns }
                        defaultSorted={ this.props.incomingData.defaultSorted }
                        columnToggle
                        search
                    >
                        {
                            props => (
                                <div>
                                    <h3>Search:</h3>
                                    <SearchBar { ...props.searchProps } />
                                    <hr />
                                    <BootstrapTable
                                        { ...props.baseProps }
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </Container>

            </div>
        );
    }
}