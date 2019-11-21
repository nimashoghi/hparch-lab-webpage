import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core"
import {Post} from "../content"

const useStyles = makeStyles(theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        paddingTop: "56.25%", // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}))

export interface PostCardProps {
    data: Post["data"]
    openModal: () => void
}
export const PostCard: React.FC<PostCardProps> = ({data, openModal}) => {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={data.image}
                    title={data.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography>{data.description}</Typography>
                </CardContent>
                <CardActions style={{justifyContent: "center"}}>
                    <Button
                        style={{width: "100%"}}
                        size="small"
                        color="primary"
                        onClick={openModal}>
                        View
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
