import React, { Component, useEffect } from 'react'
import Aux from '../../hoc/Aux'
import cssClasses from './HelpView.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import API from '../../api'
import Autocomplete from '@material-ui/lab/Autocomplete';
import endpoints from '../../api/endpoints'
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2)
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(15),
    right: theme.spacing(68)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  }
}))

export default function HelpView() {
  const classes = useStyles()
  const [helpViews, setHelpViews] = React.useState([])
  const [viewComponentType, setViewComponentType] = React.useState('')
  const [viewComponentTitle, setViewComponentTitle] = React.useState('')
  const [lastParentId, setLastParentId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const [selectedTags, setSelectedTags] = React.useState(["general"])
  const [tags, setTags] = React.useState(["general", "cairo", "past_ride", "kenya", "customer", "captain", "economy", "premium"])
  const handleChangeType = (event) => {
    setViewComponentType(event.target.value)
  }
  const handleChangeTitle = (event) => {
    setViewComponentTitle(event.target.value)
  }
  const createNewViewComponent = (event) => {
    console.log(event.target)
    setIsLoading(true)

    let jsonToSubmit

    if (viewComponentType === 'ListItem') {
      jsonToSubmit = {
        title: {
          en: viewComponentTitle
        },
        type: 'list',
        tags: [
          'customer',
          'past_trip'
        ],
        is_active: true,
        parent: lastParentId,
        help_components: [{
          type: 'ListItem',
          title: {
            en: viewComponentTitle
          }
        }],
        template_meta_data: {
          type: 'question',
          group: '5da5a675f330fa00526344d5',
          priority: 'normal',
          subject: {
            en: viewComponentTitle
          }
        }
      }
    } else if (viewComponentType === 'article') {
      jsonToSubmit = {
        title: {
          en: viewComponentTitle
        },
        type: 'article',
        tags: [
          'customer',
          'past_trip'
        ],
        is_active: true,
        parent: lastParentId,
        help_components: [{
          type: 'Description',
          title: {
            en: viewComponentTitle
          }
        }],
        template_meta_data: {
          type: 'question',
          group: '5da5a675f330fa00526344d5',
          priority: 'normal',
          subject: {
            en: viewComponentTitle
          }
        }
      }
    } else if (viewComponentType === 'form') {
      jsonToSubmit = {
        title: {
          en: viewComponentTitle
        },
        type: 'form',
        tags: [
          'customer',
          'past_trip'
        ],
        is_active: true,
        parent: lastParentId,
        help_components: [{
          type: 'Description',
          title: {
            en: viewComponentTitle
          }
        },
        {
          title: {
            en: 'Details',
            ar: 'التفاصيل'
          },
          type: 'TextBox',
          is_required: true,
          custom_field_key: '5da5b316675f33001cecae48',
          is_multiline: true
        },
        {
          title: {
            en: 'Submit',
            ar: 'ارسال'
          },
          type: 'ActionButton',
          action_type: 'submit'
        }
        ],
        template_meta_data: {
          type: 'question',
          group: '5da5a675f330fa00526344d5',
          priority: 'normal',
          subject: {
            en: viewComponentTitle
          }
        }
      }
    }

    console.log('last parent id', lastParentId)

    API.post('https://sxp-api.asgard.swvl.io/dashboard/help/create_single', jsonToSubmit)
      .then((response) => {
        console.log(response)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }
  const deactivateHelpView = (helpView) => {
    setIsLoading(true)

    API.post(`https://sxp-api.asgard.swvl.io/dashboard/help/${helpView._id}/deactivate`)
      .then((response) => {
        setIsLoading(false)
        console.log(response)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }
  const readHelpView = () => {
    API.get('https://sxp-api.asgard.swvl.io/dashboard/help/null_parents')
      .then((response) => {
        setHelpViews(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    readHelpView()
  }, [])

  useEffect(() => {
    readHelpView()
  }, [isLoading])

  const readHelpViewById = (id) => {
    API.get(`https://sxp-api.asgard.swvl.io/user/v2/help/${id}`)
      .then((response) => {
        setHelpViews(response.data.help_view_components)
        setLastParentId(id)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const getHelpViewComponent = (viewComponent) => {
    switch (viewComponent.type) {
      case 'ActionButton':
        return <ListItem> <Button
          variant='contained'
          fullWidth={false}
          style={{ backgroundColor: '#fc153b', color: 'white', width: '250px' }}
          onClick={createNewViewComponent}
        >
          {viewComponent.title}
        </Button>
        </ListItem>
      case 'TextBox':
        return <ListItem>
          <TextField id='standard-basic' className={cssClasses.margin10} label='Standard' />
        </ListItem>
      default:
        return (
          <>
            <ListItem>
              <ListItemText primary={viewComponent.title_i18n ? viewComponent.title_i18n.en : viewComponent.title} onClick={() => { readHelpViewById(viewComponent._id || viewComponent.meta_data.help_view) }} />
            </ListItem>
            <ListItem style={{ margin: '20px 0px' }} divider>
             { viewComponent && viewComponent.meta_data && viewComponent.meta_data.is_multiline ? '': <ListItemSecondaryAction style={{ top: '-150%' }}>
                <IconButton edge='end' aria-label='delete'>
                  <EditIcon />
                </IconButton>
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon onClick={() => { deactivateHelpView(viewComponent) }} />
                </IconButton>
              </ListItemSecondaryAction>}
            </ListItem>
          </>)
    }
  }
  return (
    <Aux>
      <h1>Help View Controller</h1>
      <div className={cssClasses.Container}>
        <div className={cssClasses.menuItemContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Select the help element you want to add</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple'
              onChange={(handleChangeType)}
            >
              <MenuItem name='type' value='ListItem'>List item</MenuItem>
              <MenuItem name='type' value='article'>Article</MenuItem>
              <MenuItem name='type' value='form'>Form</MenuItem>
            </Select>
          </FormControl>
          <TextField id='standard-basic' className={cssClasses.margin10} label='Element text' onChange={handleChangeTitle} />

          <FormControl className={classes.formControl}>
            <div className={[classes.root, cssClasses.margin10]} style={{ marginTop: '10px' }}>  <Autocomplete
              multiple
              id="tags-outlined"
              options={tags}
              getOptionLabel={(option) => option}
              defaultValue={selectedTags}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select the required tags"
                  placeholder="Tags"
                />
              )}
            /></div>
          </FormControl>
          <Button
            variant='contained'
            fullWidth={false}
            style={{ backgroundColor: '#fc153b', color: 'white', width: '100px' }}
            onClick={createNewViewComponent}
          >
            Save
          </Button>
        </div>
        <div className={cssClasses.mobileScreenContainer}>
          <div
            style={{
              width: '45%',
              margin: '100px'
            }}
          >
            {

              <List dense>
                {
                  helpViews.filter(e => e.is_active === true && !['HiddenProperty'].includes(e.type)).map((helpView, index) => {
                    return (
                      getHelpViewComponent(helpView)
                    )
                  })
                }
              </List>
            }
          </div>
        </div>
      </div>
    </Aux >
  )
}
