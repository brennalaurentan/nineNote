// styles

// components / pages / images

// tools
import { Card, CardContent, Stack, Typography } from '@mui/material';
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
                    console.log("Books array: ", moduleBooksRefArray);
                    const numberOfBooks = moduleBooksRefArray.length;
                    console.log("Number of books: ", numberOfBooks);

                    let bookCount = 0;
                    let moduleBooksArray = [];
                    moduleBooksRefArray.forEach(async book => {
                        const moduleBooksDocumentSnapshot = await getDoc(book);
                        const newBook = {
                            bookTitle: moduleBooksDocumentSnapshot.data().bookTitle,
                            bookAuthor: moduleBooksDocumentSnapshot.data().bookAuthor,
                            bookPublisher: moduleBooksDocumentSnapshot.data().bookPublisher,
                            bookISBN13: moduleBooksDocumentSnapshot.data().bookISBN13,
                            bookImage: moduleBooksDocumentSnapshot.data().bookImage,
                        }
                        moduleBooksArray.push(newBook);
                        bookCount = bookCount + 1;
                        console.log("Current book: ", newBook.bookTitle);
                        console.log("Loop local module books array: ", moduleBooksArray);
                        
                        if (bookCount === numberOfBooks) {
                            setModuleBooks(moduleBooksArray);
                        }
                    });

                    console.log("Local module books array: ", moduleBooksArray);
                } else {
                    setModuleBooks([]);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        retrieveModuleBooks();
    }, [selectedModuleResources])

    return (
        <Card
            elevation={0}
            sx={{
                marginBottom: "10px",
                padding: "30px",
                width: "42vw",
                bgcolor: "light_blue.light",
                borderRadius: "15px",
                height: '100vh',
                overflow: 'scroll'
            }}>
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
                            {moduleBooks.length !== 0
                                ? moduleBooks.map((book, index) => (
                                    <Stack key={index} direction="row" gap="32px" alignItems="center">
                                        <img src={book.bookImage} alt="Logo" width="200px" />
                                        <Stack>
                                            <Typography variant="body_bold">{book.bookTitle}</Typography>
                                            <Typography variant="tag_thin">ISBN-13: {book.bookISBN13}</Typography>
                                            <Typography variant="tag_thin">Author: {book.bookAuthor}</Typography>
                                            <Typography variant="tag_thin">Publisher: {book.bookPublisher}</Typography>
                                        </Stack>
                                    </Stack>
                                ))
                                : <Typography variant="body_thin">No module books available.</Typography>
                            }
                        </Stack>
                    </Stack>

                </Stack>
            </CardContent>
        </Card>
    )
}

export default ModuleResourceCard