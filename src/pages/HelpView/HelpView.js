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
import endpoints from '../../api/endpoints'
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@material-ui/core'

const firstListResponse = {
  help_view_components: [
    {
      title: 'I have an issue with COVID',
      type: 'ListItem',
      meta_data: {
        help_view: 'firstId'
      }
    },
    {
      title: 'I have an with the captain',
      type: 'ListItem',
      meta_data: {
        help_view: 'secondId'
      }
    }
  ]
}
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
  }
}))

export default function HelpView() {
  const classes = useStyles()
  const [helpViews, setHelpViews] = React.useState([])
  const [viewComponent, setViewComponent] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleChange = (event) => {
    setViewComponent(event.target.value)
  }
  const createNewViewComponent = (event) => {
    console.log(event.target)
    setIsLoading(true);

    API.post('https://sxp-api.asgard.swvl.io/dashboard/help/create_single', {
      title: {
        en: 'I have a completely new COVID-19 issue'
      },
      type: 'article',
      tags: [
        'customer',
        'past_trip'
      ],
      is_active: true,
      help_components: [
        {
          title: {
            en: "Phone numbers and email addresses are unique to each user. The same phone number or email address can't be used in more than one account. \nIf you already have an account but forgot the password, you can easily reset it by selecting I forgot my password while signing in. You will receive an email with the reset link where you can create a new password. Please note that this link expires within 24 hours.",
            ar: 'رقم الهاتف والبريد الإلكتروني يجب أن يكونان فريدان لكل مستخدم، ولا يمكن استخدام نفس رقم الهاتف أو البريد الإلكتروني في أكثر من حساب.\nإذا كان لديك حساب بالفعل ولكنك نسيت كلمة المرور، فيمكنك إعادة تعيينه بسهولة عن طريق اختيار لقد نسيت كلمة المرور أثناء تسجيل الدخول. ستتلقى رسالة على بريدك الإلكتروني تحتوي على رابط لإعادة تعيين كلمة المرور، يمكنك إنشاء كلمة مرور جديدة من خلاله.  سوف تنتهي صلاحية هذا الرابط خلال ٢٤ ساعة.'
          },
          type: 'Description'
        }
      ]
    })
      .then((response) => {
        console.log(response)
        setIsLoading(false);

      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);

      })
  }
  const deactivateHelpView = (helpView) => {
    setIsLoading(true);

    API.post(`https://sxp-api.asgard.swvl.io/dashboard/help/${helpView._id}/deactivate`)
      .then((response) => {
        setIsLoading(false);

        console.log(response)
      })
      .catch((err) => {
        setIsLoading(false);

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
        console.log(response.data)
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
          color='primary'
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
        return <ListItem>
          <ListItemText primary={viewComponent.title_i18n ? viewComponent.title_i18n.en : viewComponent.title} onClick={() => { readHelpViewById(viewComponent._id || viewComponent.meta_data.help_view) }} />
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label='delete'>
              <EditIcon />
            </IconButton>
            <IconButton edge='end' aria-label='delete'>
              <DeleteIcon onClick={() => { deactivateHelpView(viewComponent) }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
    }
  }
  return (
    <Aux>
      <h1>Help View Controller</h1>
      <div className={cssClasses.Container}>
        <div className={cssClasses.menuItemContainer}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Write slash '/' to select the component</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={viewComponent}
              onChange={handleChange}
            >
              <MenuItem value={10}>List Item</MenuItem>
              <MenuItem value={20}>Article</MenuItem>
              <MenuItem value={30}>TextInput</MenuItem>
              <MenuItem value={30}>Button</MenuItem>
            </Select>
          </FormControl>
          <TextField id='standard-basic' className={cssClasses.margin10} label='Standard' />

          <Button
            variant='contained'
            fullWidth={false}
            color='primary'
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
                  helpViews.filter(e => e.is_active === true && e.type != "HiddenProperty").map((helpView, index) => {
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
    </Aux>
  )
}
