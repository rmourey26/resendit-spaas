"use client"

import React, { useState } from "react"
import { Grid, Card, CardContent, Typography, CardActions, Button, Tabs, Tab, Box } from "@mui/material"
import { agentTemplates } from "@/lib/ai/agent-templates"

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const AgentTemplateSelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("general")
  const [tabValue, setTabValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    switch (newValue) {
      case 0:
        setSelectedCategory("general")
        break
      case 1:
        setSelectedCategory("data")
        break
      case 2:
        setSelectedCategory("blockchain")
        break
      case 3:
        setSelectedCategory("supply-chain")
        break
      case 4:
        setSelectedCategory("developer")
        break
      case 5:
        setSelectedCategory("smart-contracts")
        break
      case 6:
        setSelectedCategory("quality")
        break
      case 7:
        setSelectedCategory("healthcare")
        break
      case 8:
        setSelectedCategory("pharmaceuticals")
        break
      case 9:
        setSelectedCategory("data-center")
        break
      default:
        setSelectedCategory("general")
        break
    }
  }

  const categories = [
    { id: "general", name: "General" },
    { id: "data", name: "Data Analysis" },
    { id: "blockchain", name: "Blockchain" },
    { id: "supply-chain", name: "Supply Chain" },
    { id: "developer", name: "Developer" },
    { id: "smart-contracts", name: "Smart Contracts" },
    { id: "quality", name: "Quality" },
    { id: "healthcare", name: "Healthcare" },
    { id: "pharmaceuticals", name: "Pharmaceuticals" },
    { id: "data-center", name: "Data Center" },
  ]

  const filteredTemplates = agentTemplates.filter((template) => template.category === selectedCategory)

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="agent template categories">
          {categories.map((category, index) => (
            <Tab label={category.name} {...a11yProps(index)} key={category.id} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {template.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export { AgentTemplateSelector }
