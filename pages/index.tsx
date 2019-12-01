import {
    AppBar,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    makeStyles,
    Slide,
    Toolbar,
    Typography,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import React, {useCallback, useMemo, useState} from "react"
import ReactMarkdown from "react-markdown"
import {PostCard} from "../components/Post"
import {getInformation, getPosts, Information, Post} from "../server/content"

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
))

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "relative",
    },
    title: {marginLeft: theme.spacing(2), flex: 1},

    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGridContainer: {
        flex: 1,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardGrid: {
        flex: 1,
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1.5),
    },
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export interface PostsProps {
    information?: Information
    posts?: Post[]
}
export const Posts: React.FC<PostsProps> & {
    getInitialProps?: () => Promise<PostsProps>
} = ({
    information: {buttons, subtitle, title} = {
        buttons: [],
        subtitle: "",
        title: "",
    },
    posts = [],
}) => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState<number>()
    const handleClose = useCallback(() => void setOpenModal(undefined), [
        setOpenModal,
    ])
    const modalPost = useMemo(
        () => (openModal !== undefined ? posts[openModal] : undefined),
        [openModal],
    )

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}>
            <CssBaseline />

            <main style={{flex: 1}}>
                <Dialog
                    fullScreen
                    open={openModal !== undefined}
                    onClose={() => setOpenModal(undefined)}
                    aria-labelledby="customized-dialog-title"
                    TransitionComponent={Transition as any}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {modalPost?.data.title ?? ""}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent dividers>
                        <ReactMarkdown
                            escapeHtml={false}
                            source={modalPost?.content ?? ""}
                        />
                    </DialogContent>
                </Dialog>

                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph>
                            {subtitle}
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                {buttons.map(({href, title, variant}, i) => (
                                    <Grid key={`${i}`} item>
                                        <Button
                                            color="primary"
                                            {...{href, variant}}>
                                            {title}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGridContainer} maxWidth="md">
                    {/* End hero unit */}
                    <Grid
                        className={classes.cardGrid}
                        container
                        spacing={4}
                        justify="center"
                        alignItems="center">
                        {posts.map(({data}, i) => (
                            <PostCard
                                key={`${i}`}
                                data={data}
                                openModal={() => setOpenModal(i)}
                            />
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="textSecondary"
                    component="p">
                    Created by Nima Shoghi
                </Typography>
            </footer>
            {/* End footer */}
        </div>
    )
}
Posts.getInitialProps = async () => {
    if (process.browser) {
        return (globalThis as any).__NEXT_DATA__.props.pageProps
    }
    const contentPath = "./content/"

    const [information, posts] = await Promise.all([
        getInformation(contentPath),
        getPosts(contentPath),
    ])
    return {information, posts}
}
export default Posts
