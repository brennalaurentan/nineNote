// styles

// components / pages / images
import ModulePill from './ModulePill';
import ButtonDialog from './ButtonDialog';

// tools
import React, { useState } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { v4 } from 'uuid';

const item1 = {
    id: v4(),
    code: "MA1301",
    name: "Introductory Mathematics",
    mc: "4"
}

const ModuleExemptions = () => {
    const [state, setState] = useState({
        "Exemptions": {
            title: "",
            items: [item1]
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
        const itemCopy = { ...state[source.droppableId].items[source.index] };
        setState(prev => {
            prev = { ...prev }
            // remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)
            // adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
            return prev
        })
    }

    const addModule = (moduleCode, moduleName, moduleMC) => {
        setState(prev => {
            return {
                ...prev,
                "Exemptions": {
                    title: "",
                    items: [
                        {
                            id: v4(),
                            code: moduleCode,
                            name: moduleName,
                            mc: moduleMC
                        },
                        ...prev['Exemptions'].items
                    ]
                }
            }
        })
    }

    return (
        <Stack gap="32px">
            <Typography variant="h3">Module Exemptions</Typography>

            <DragDropContext onDragEnd={handleDragEnd}>
                {_.map(state, (data, key) => {
                    return (
                        <>
                            <Box bgcolor="light_blue.light" padding="30px" borderRadius="30px" display="flex" flexDirection="column" gap="30px">
                                <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center" marginTop="5px">
                                    <Typography variant="body_bold">{data.title}</Typography>
                                    <ButtonDialog
                                        button_text="+ ADD NEW"
                                        header="Add Module Exemptions"
                                        text="Search for your exempted modules by their respective module code 
                                        and add them to your module exemptions!"
                                        onSubmit={addModule} />
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
                                                                            mc={el.mc} />
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
        </Stack>
    )
}

export default ModuleExemptions