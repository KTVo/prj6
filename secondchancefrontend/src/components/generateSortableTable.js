import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, columnToggle } from 'react-bootstrap-table2-toolkit';
import {Button, Container, Modal} from 'react-bootstrap';
import {DrWritesSecondOpinion} from './drWritesSecondOpinion';
import 'bootstrap/dist/css/bootstrap.css';
const {SearchBar} = Search;

export class GenerateSortableTable extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            parsedJSONObj: [], //this array will have everything parsedJSONObj and will include a url to caseID and cancel buttons
            error: null,
            showModal: false,
            record_assessment_id: null,
            showAssessmentPageModal: false
        };

        this.recordID = null;
        this.ShowAssessmentPageModalHandle = this.ShowAssessmentPageModalHandle.bind(this);
    }





    handleModal(status, record_assessment_id)
    {

        console.log("6969 I am the handleModal function")
        console.log(record_assessment_id);
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

    }

    CaseCancellationHandle(record_assessment_id)
    {


        //send to backend this.state.parsedJSONObj.record_id for deletion
        console.log("MF DELETE" + record_assessment_id);
        //Call in fetch to delete case with id

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"record_assessment_id": record_assessment_id,
                                        "assessment": "", "status": "Cancelled"})
        };

        fetch("http://52.247.220.137:80/update_pending_records", requestOptions)
            .then(response=>response.text())
            .then(text => console.log(text));
        //Close Modal
        this.CloseModalHandle();
        //Refreshes page
        window.location.reload(false);


    }


    ConfirmCancelButtonHandle(record_assessment_id)
    {
        console.log("I am the ConfirmCancelButtonHandle function");
        console.log(record_assessment_id);
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

        console.log("Testing get_all_patient_records POST from Client Ongoing Table");


        fetch(this.props.incomingData.URL_for_Fetch, this.props.incomingData.requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("RESULT PATIENT TABLE");
                    console.log(result);
                    let l = result.length;
                    for (let i = 0; i < l; i++) {
                        if (result[i].status == "pending" && this.props.is_patient) {
                            result[i].cancelButton = <Button onClick={() => {
                                console.log(" --- " + result[i].record_assessment_id);
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
                                        window.location.reload(false)});
                            }}>Accept</Button>
                        }

                        else if(result[i].status == "Diagnosing" && !this.props.is_patient) {
                            console.log("h2llo")
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


    AcceptCaseHandle(recordID){
        console.log("GIVE IT TO0");

        return(<div><DrWritesSecondOpinion status={true} recordID={this.recordID}/></div>);
    }

    appendCancelButtonToArrayHandle(id)
    {
        //Send a request to backend to cancel case with id
        console.log("I am canceling Case# " + id);

        this.state.parsedJSONObj.map((eachElement) =>
            {
                this.setState({
                    //improvedArray.wf: eachElement.assessment;
                })
            }
        )
    }


    render() {
        return (
            <div>
                {this.ConfirmCancelButtonHandle(this.state.record_assessment_id)}
                <Container>
                    { this.state.showAssessmentPageModal && <DrWritesSecondOpinion recordID={this.recordID}
                                                                                   showAssessmentPageModal={this.state.showAssessmentPageModal}
                                                                                   ShowAssessmentPageModalHandle = {this.ShowAssessmentPageModalHandle}/> }
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
                                    <h3>Input something at below input field:</h3>
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