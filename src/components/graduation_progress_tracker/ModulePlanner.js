// styles

// components / pages / images
import MainButton from '../common/MainButton';
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';

// tools
import React, { useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { v4 } from 'uuid';

const item1 = {
    id: v4(),
    code: "CS1231S",
    name: "Discrete Structures",
    mc: "4"
}

const item2 = {
    id: v4(),
    code: "CS1101S",
    name: "Programming Methodology I",
    mc: "4"
}

const item3 = {
    id: v4(),
    code: "MA1521",
    name: "Calculus for Computing",
    mc: "4"
}

const ModulePlanner = () => {
    const [state, setState] = useState({
        "Y1 S1": {
            title: "Y1 S1",
            items: [item1]
        },
        "Y1 S2": {
            title: "Y1 S2",
            items: [item2]
        },
        "Y1 ST1": {
            title: "Y1 ST1",
            items: []
        }
    })

    const handleDragEnd = ({ destination, source }) => {
        console.log("from", source)
        console.log("to", destination)

        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // creating a copy of item before removing from state
        const itemCopy = {...state[source.droppableId].items[source.index]};
        setState(prev => {
            prev = {...prev}
            // remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)
            // adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            return prev
        })

        const addItem = () => {
            setState(prev => {
                return {
                    ...prev,
                    "Y1 S1": {
                        title: "Y1 S1",
                        items: [
                            {
                                id: v4(),
                                name: ""
                            }, 
                            ...prev['Y1 S1'].items
                        ]
                    }
                }
            })
        }

    }

    return (
        <Stack gap="32px" width="100vw">
            <Stack direction="row" display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Module Planner</Typography>
                <MainButton type="contained" main_color="blue.main" value="SAVE" />
            </Stack>
            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                    return (
                        <>
                            <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                                <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px">
                                    <Typography variant="body_bold">{data.title}</Typography>
                                    <ButtonDialog
                                        button_text="+ ADD NEW"
                                        header="Add Module"
                                        text="Search for your desired modules by their respective module code 
                                        and add them to your module planner!"/>
                                </Stack>
                                <Droppable droppableId={key}>
                                    {(provided) => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                {data.items.map((el, index) => {
                                                    return (
                                                        <Draggable key={el.id} index={index} draggableId={el.id}>
                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <ModulePill 
                                                                            code={el.code} 
                                                                            name={el.name} 
                                                                            mc={el.mc}/>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </Box>
                        </>
                    );
                })}
            </DragDropContext>
        </Stack >
    )
}

export default ModulePlanner