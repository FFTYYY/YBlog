/** 
 * 这个文件提供一个开箱即用的editor示例。
 * @module
 */
 import React from "react"
 import Button from "@mui/material/Button"

import type { StyleType , NodeType } from "../../core/elements"

import { Node } from "slate"
import { object_foreach } from "../../utils"

import {EditorCore , InlineStyle , GroupStyle , StructStyle , SupportStyle , AbstractStyle} from "../../core/editor_core"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Paper , Divider } from '@mui/material';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import CoffeeIcon from '@mui/icons-material/Coffee';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {my_theme} from "../theme"
import {OutRenderer} from "../../out_renderer"
import type {OutRenderer_Props} from "../../out_renderer"
import {FilledStyle , ScrollFilledStyle } from "../default_editor/universe" // TODO 这个文件需要换个位置。

export { DefaultRenderer }

interface DefaultRenderer_Props{
	outer: OutRenderer
}

/** 
 * 这个组件提供一个开箱即用的默认渲染器组件。
 */
class DefaultRenderer extends React.Component <DefaultRenderer_Props> {
    outer: OutRenderer

	constructor(props: DefaultRenderer_Props) {
		super(props)


		this.outer = props.outer
    }

    render() {
        return <ThemeProvider theme={my_theme}><Paper sx={FilledStyle}>
            <OutRenderer.Component
			    renderer = {this.outer}
		    />
        </Paper></ThemeProvider>
	}
}
