import { Button, Input } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useState } from 'react';
import { Container, Form } from 'reactstrap';

export default (props) => {
      const [state, setState] = React.useState({
    cats: [{ name: "cat1", age: "2" }, { name: "cat2", age: "5" }],
    owner: "Owner's Name"
  });
  const handleFormChange = e => {
    if (["name", "age"].includes(e.target.dataset.fieldType)) {
      const newCats = [...state.cats];
      newCats[e.target.dataset.id][e.target.dataset.fieldType] = e.target.value;
      setState({ ...state, cats: newCats });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

    return (
        <Container fluid style={{ border: '1px solid blue' }}>
            <Form>
<TableBody>
                <TableRow >
                    <TableCell align="right">
                        <Input placeholder="Type your message here..."  value={messageBody}></Input>
                    </TableCell>
                    <TableCell align="right">
                        <Button
                            color="success"
                            variant="contained"
                            onClick={() => submitPost()}
                        >
                            Post</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Form>
            

        </Container>

    )


}


