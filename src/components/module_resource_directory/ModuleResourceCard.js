// styles

// components / pages / images

// tools
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';

const ModuleResourceCard = ({ moduleCode, moduleMC, moduleName, moduleFaculty, moduleDept, selectedModuleResources }) => {
    // handles module books retrieved using reference paths stored 
    const [moduleBooks, setModuleBooks] = useState([]);

    // function to retrieve module books using reference paths stored
    useEffect(() => {
        async function retrieveModuleBooks() {
            const moduleBooksRefArray = selectedModuleResources.moduleBooks;
            try {
                if (Array.isArray(moduleBooksRefArray)) {
                    console.log("yes, array!");
                    console.log("books array: ", moduleBooksRefArray);
                    console.log("number of books: ", moduleBooksRefArray.length);

                    let moduleBooksArray = [];
                    moduleBooksRefArray.forEach(async book => {
                        const moduleBooksDocumentSnapshot = await getDoc(book);
                        const newBook = {
                            bookTitle: moduleBooksDocumentSnapshot.data().bookTitle,
                            bookAuthor: moduleBooksDocumentSnapshot.data().bookAuthor,
                            bookPublisher: moduleBooksDocumentSnapshot.data().bookPublisher,
                            bookISBN13: moduleBooksDocumentSnapshot.data().bookISBN13,
                        }
                        moduleBooksArray.push(newBook);
                        console.log("current book: ", newBook.bookTitle);
                        console.log("loop local module books array: ", moduleBooksArray);
                        setModuleBooks(moduleBooksArray);
                    });

                    console.log("local module books array: ", moduleBooksArray);
                } else {
                    console.log("no, not array!");
                    setModuleBooks([]);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        retrieveModuleBooks();
    }, [selectedModuleResources])

    return (
        <Card elevation={0} sx={{ marginBottom: "10px", padding: "30px", width: "42vw", bgcolor: "light_blue.light", borderRadius: "15px" }}>
            <CardContent>
                <Stack gap="32px">
                    {/* module details retrieved from nusmods api */}
                    <Stack gap="8px">
                        <Typography variant="h2">{moduleCode}</Typography>
                        <Typography variant="h4">{moduleName}</Typography>
                        <Typography variant="tag_thin">{moduleDept} • {moduleFaculty} • {moduleMC} MCs</Typography>
                    </Stack>

                    {/* module description */}
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Description</Typography>
                        <Typography variant="body_thin">{selectedModuleResources.moduleDescription}</Typography>
                    </Stack>

                    {/* module website */}
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Website</Typography>
                        <Typography variant="body_thin">{selectedModuleResources.moduleWebsite}</Typography>
                    </Stack>

                    {/* module books */}
                    <Stack gap="8px">
                        <Typography variant="body_bold" color="light_blue.dark">Module Books</Typography>
                        <Stack gap="32px">
                            {moduleBooks.map((book, index) => (
                                <Box key={index} display="flex" flexDirection="column">
                                    <Typography variant="body_bold">{book.bookTitle}</Typography>
                                    <Typography variant="tag_thin">ISBN-13: {book.bookISBN13}</Typography>
                                    <Typography variant="tag_thin">Author: {book.bookAuthor}</Typography>
                                    <Typography variant="tag_thin">Publisher: {book.bookPublisher}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Stack>

                </Stack>
            </CardContent>
        </Card>
    )
}

export default ModuleResourceCard