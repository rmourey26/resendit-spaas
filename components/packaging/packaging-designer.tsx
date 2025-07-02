"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { ImageUpload } from "@/components/image-upload"
import { FileUpload } from "./file-upload"
import { ColorPickerModal } from "@/components/color-picker-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Package, Leaf, BarChart3, Recycle, Zap } from "lucide-react"

interface PackagingDesignerProps {
  userId: string
  profileData: any
  onSubmit: (designData: any) => void
}

// These would normally be imported from lib/schemas/packaging
// For this example, I'm defining them inline to ensure the component works
const packagingMaterials = [
  {
    id: "pp_woven",
    name: "PP Woven Fabric",
    description: "Tear-resistant and lightweight • 200+ handling cycles • 30% less mass than cardboard",
    priceMultiplier: 1.0,
    co2Reduction: 1.2,
    categories: ["mailer", "box", "envelope"],
    recyclable: true,
    biodegradable: false,
    reusable: true,
    maxLifecycleCount: 200,
    features: ["durable", "water_resistant"],
  },
  {
    id: "pp_nonwoven",
    name: "PP Non-Woven Fabric",
    description: "Soft and flexible • 100+ handling cycles • Lightweight and durable",
    priceMultiplier: 1.2,
    co2Reduction: 0.9,
    categories: ["mailer", "envelope"],
    recyclable: true,
    biodegradable: false,
    reusable: true,
    maxLifecycleCount: 100,
    features: ["durable", "water_resistant"],
  },
  {
    id: "recycled_cotton",
    name: "Recycled Cotton Blend",
    description: "Eco-friendly and biodegradable • 50+ handling cycles • Soft and natural feel",
    priceMultiplier: 1.3,
    co2Reduction: 1.5,
    categories: ["mailer", "envelope"],
    recyclable: true,
    biodegradable: true,
    reusable: true,
    maxLifecycleCount: 50,
    features: ["biodegradable"],
  },
  {
    id: "laminated_rubber",
    name: "Laminated Rubber",
    description: "Extremely durable • 300+ handling cycles • Waterproof and puncture-resistant",
    priceMultiplier: 1.5,
    co2Reduction: 0.8,
    categories: ["mailer", "box"],
    recyclable: false,
    biodegradable: false,
    reusable: true,
    maxLifecycleCount: 300,
    features: ["extreme_durability", "waterproof"],
  },
  {
    id: "recycled_plastic",
    name: "Recycled Plastic",
    description: "Made from post-consumer waste • 50+ handling cycles • Waterproof",
    priceMultiplier: 1.1,
    co2Reduction: 1.0,
    categories: ["mailer", "box", "envelope"],
    recyclable: true,
    biodegradable: false,
    reusable: true,
    maxLifecycleCount: 50,
    features: ["waterproof"],
  },
]

const packageCategories = [
  {
    id: "mailer",
    name: "Mailer Bag",
    description: "Flexible packaging for clothing, soft goods, and non-fragile items",
    basePrice: 25.99,
  },
  {
    id: "box",
    name: "Box",
    description: "Rigid packaging for fragile items and products that need protection",
    basePrice: 32.99,
  },
  {
    id: "envelope",
    name: "Document Envelope",
    description: "Flat packaging for documents, photos, and thin items",
    basePrice: 19.99,
  },
  {
    id: "tube",
    name: "Shipping Tube",
    description: "Cylindrical packaging for posters, blueprints, and rolled items",
    basePrice: 27.99,
  },
]

const standardPackagingDimensions = {
  mailer: {
    small: {
      width: 10,
      height: 13,
      depth: 1,
      description: '10" × 13" - Fits small clothing items, accessories',
    },
    medium: {
      width: 12,
      height: 15.5,
      depth: 1,
      description: '12" × 15.5" - Fits medium clothing items, small electronics',
    },
    large: {
      width: 14.5,
      height: 19,
      depth: 1.5,
      description: '14.5" × 19" - Fits large clothing items, multiple products',
    },
  },
  box: {
    small: {
      width: 8,
      height: 8,
      depth: 4,
      description: '8" × 8" × 4" - Fits small products, accessories',
    },
    medium: {
      width: 12,
      height: 12,
      depth: 6,
      description: '12" × 12" × 6" - Fits medium-sized products',
    },
    large: {
      width: 16,
      height: 16,
      depth: 8,
      description: '16" × 16" × 8" - Fits larger products, multiple items',
    },
  },
  envelope: {
    small: {
      width: 9,
      height: 12,
      depth: 0.25,
      description: '9" × 12" - Fits letter-sized documents',
    },
    medium: {
      width: 10,
      height: 13,
      depth: 0.25,
      description: '10" × 13" - Fits legal-sized documents',
    },
    large: {
      width: 12,
      height: 15,
      depth: 0.5,
      description: '12" × 15" - Fits larger documents, photos, certificates',
    },
  },
  tube: {
    small: {
      width: 2,
      height: 24,
      depth: 2,
      description: '2" × 24" - Fits small posters, blueprints',
    },
    medium: {
      width: 3,
      height: 36,
      depth: 3,
      description: '3" × 36" - Fits medium posters, architectural plans',
    },
    large: {
      width: 4,
      height: 48,
      depth: 4,
      description: '4" × 48" - Fits large posters, multiple rolled items',
    },
  },
}

const iotSensorInfo = {
  pricePerSensor: 12.99,
  features: [
    {
      id: "temperatureSensing",
      name: "Temperature Sensing",
      description: "Monitor temperature conditions during transit",
      priceAdder: 2.5,
    },
    {
      id: "humiditySensing",
      name: "Humidity Sensing",
      description: "Monitor humidity levels during transit",
      priceAdder: 2.5,
    },
    {
      id: "locationTracking",
      name: "Location Tracking",
      description: "Real-time GPS location tracking",
      priceAdder: 5.0,
    },
    {
      id: "shockDetection",
      name: "Shock Detection",
      description: "Detect and record impact events",
      priceAdder: 3.0,
    },
    {
      id: "tamperDetection",
      name: "Tamper Detection",
      description: "Alert when package is opened unexpectedly",
      priceAdder: 4.0,
    },
  ],
  batteryOptions: [
    {
      id: "standard",
      name: "Standard Battery",
      description: "30-day battery life",
      priceAdder: 0,
    },
    {
      id: "extended",
      name: "Extended Battery",
      description: "90-day battery life",
      priceAdder: 5.0,
    },
  ],
  reportingFrequencies: [
    {
      id: "realtime",
      name: "Real-time",
      description: "Continuous updates",
      priceAdder: 8.0,
    },
    {
      id: "hourly",
      name: "Hourly",
      description: "Updates every hour",
      priceAdder: 0,
    },
    {
      id: "daily",
      name: "Daily",
      description: "Updates once per day",
      priceAdder: -3.0,
    },
  ],
}

const sustainabilityPrograms = {
  carbonOffset: {
    priceMultiplier: 0.05,
    description: "Offset the carbon footprint of your packaging and shipping",
  },
  returnProgram: {
    pricePerUnit: 1.99,
    discountPercentage: 0.1,
    description: "Return packaging for reuse and receive discounts on future orders",
  },
  bulkDiscount: {
    thresholds: [
      { quantity: 100, discount: 0.05 },
      { quantity: 500, discount: 0.1 },
      { quantity: 1000, discount: 0.15 },
      { quantity: 5000, discount: 0.2 },
    ],
  },
}

const resendItPackage = {
  name: "Resend*it Premium Package",
  description:
    "Our flagship reusable packaging solution made from durable PP woven fabric with enhanced sustainability features",
  material: "pp_woven",
  priceMultiplier: 1.2,
  co2Reduction: 1.5,
  features: [
    "Tear-resistant and lightweight",
    "200+ handling cycles",
    "30% less mass than cardboard",
    "Integrated return label QR code",
    "Water-resistant construction",
  ],
  sizes: [
    {
      id: "small",
      name: "Small",
      dimensions: { width: 10, height: 13, depth: 1 },
      price: 29.99,
    },
    {
      id: "medium",
      name: "Medium",
      dimensions: { width: 12, height: 15.5, depth: 1 },
      price: 34.99,
    },
    {
      id: "large",
      name: "Large",
      dimensions: { width: 14.5, height: 19, depth: 1.5 },
      price: 39.99,
    },
  ],
}

export function PackagingDesigner({ userId, profileData, onSubmit }: PackagingDesignerProps) {
  const [activeTab, setActiveTab] = useState("type")
  const [orderType, setOrderType] = useState<"standard" | "custom" | "bulk">("standard")
  const [packageCategory, setPackageCategory] = useState("mailer")
  const [packageSize, setPackageSize] = useState("small")
  const [isResendItPackage, setIsResendItPackage] = useState(false)
  const [materialType, setMaterialType] = useState("pp_woven")
  const [quantity, setQuantity] = useState(100)
  const [hasIotSensors, setHasIotSensors] = useState(false)
  const [iotSensorCount, setIotSensorCount] = useState(0)
  const [iotSensorConfig, setIotSensorConfig] = useState({
    temperatureSensing: false,
    humiditySensing: false,
    locationTracking: false,
    shockDetection: false,
    tamperDetection: false,
    batteryLife: "standard",
    reportingFrequency: "hourly",
  })
  const [carbonOffset, setCarbonOffset] = useState(false)
  const [returnProgramEnrollment, setReturnProgramEnrollment] = useState(false)
  const [dimensions, setDimensions] = useState(standardPackagingDimensions.mailer.small)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [designData, setDesignData] = useState({
    brandColor: profileData?.company_logo_url ? "#0070f3" : "#000000",
    secondaryColor: "#ffffff",
    logo: profileData?.company_logo_url || "",
    logoPosition: "center",
    textColor: "#000000",
    font: "Inter",
    additionalText: profileData?.company || "",
    useCompanyLogo: !!profileData?.company_logo_url,
  })
  const [designFiles, setDesignFiles] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [co2Savings, setCo2Savings] = useState(0)

  // Filter materials based on selected package category
  const filteredMaterials = packagingMaterials.filter((material) => material.categories.includes(packageCategory))

  // Get available sizes for the selected package category
  const availableSizes = standardPackagingDimensions[packageCategory as keyof typeof standardPackagingDimensions] || {}

  // Update dimensions when package category or size changes
  useEffect(() => {
    if (isResendItPackage) {
      const size = resendItPackage.sizes.find((s) => s.id === packageSize) || resendItPackage.sizes[0]
      setDimensions(size.dimensions)
    } else if (orderType === "standard") {
      const categoryDimensions =
        standardPackagingDimensions[packageCategory as keyof typeof standardPackagingDimensions]
      if (categoryDimensions) {
        const sizeDimensions = categoryDimensions[packageSize as keyof typeof categoryDimensions]
        if (sizeDimensions) {
          setDimensions(sizeDimensions)
        }
      }
    }
  }, [packageCategory, packageSize, orderType, isResendItPackage])

  // Calculate price and CO2 savings whenever relevant fields change
  useEffect(() => {
    // Get the base price for the package category
    let basePrice = 0

    if (isResendItPackage) {
      const size = resendItPackage.sizes.find((s) => s.id === packageSize) || resendItPackage.sizes[0]
      basePrice = size.price * quantity
    } else {
      const category = packageCategories.find((cat) => cat.id === packageCategory) || packageCategories[0]
      basePrice = category.basePrice * quantity
    }

    // Apply material price multiplier
    const material = packagingMaterials.find((mat) => mat.id === materialType) || packagingMaterials[0]
    const materialMultiplier = isResendItPackage ? resendItPackage.priceMultiplier : material.priceMultiplier

    // Add IoT sensor costs
    let iotSensorCost = 0
    if (hasIotSensors && iotSensorCount > 0) {
      let sensorBasePrice = iotSensorInfo.pricePerSensor

      // Add costs for specific sensor features
      if (iotSensorConfig.temperatureSensing) {
        const feature = iotSensorInfo.features.find((f) => f.id === "temperatureSensing")
        if (feature) sensorBasePrice += feature.priceAdder
      }

      if (iotSensorConfig.humiditySensing) {
        const feature = iotSensorInfo.features.find((f) => f.id === "humiditySensing")
        if (feature) sensorBasePrice += feature.priceAdder
      }

      if (iotSensorConfig.locationTracking) {
        const feature = iotSensorInfo.features.find((f) => f.id === "locationTracking")
        if (feature) sensorBasePrice += feature.priceAdder
      }

      if (iotSensorConfig.shockDetection) {
        const feature = iotSensorInfo.features.find((f) => f.id === "shockDetection")
        if (feature) sensorBasePrice += feature.priceAdder
      }

      if (iotSensorConfig.tamperDetection) {
        const feature = iotSensorInfo.features.find((f) => f.id === "tamperDetection")
        if (feature) sensorBasePrice += feature.priceAdder
      }

      // Add battery option cost
      if (iotSensorConfig.batteryLife === "extended") {
        const battery = iotSensorInfo.batteryOptions.find((b) => b.id === "extended")
        if (battery) sensorBasePrice += battery.priceAdder
      }

      // Add reporting frequency cost
      const frequency = iotSensorInfo.reportingFrequencies.find((f) => f.id === iotSensorConfig.reportingFrequency)
      if (frequency) sensorBasePrice += frequency.priceAdder

      iotSensorCost = sensorBasePrice * iotSensorCount
    }

    // Apply bulk order discounts
    let bulkDiscount = 0
    if (orderType === "bulk") {
      for (const threshold of sustainabilityPrograms.bulkDiscount.thresholds) {
        if (quantity >= threshold.quantity) {
          bulkDiscount = threshold.discount
        }
      }
    }

    // Add carbon offset cost if selected
    let carbonOffsetCost = 0
    if (carbonOffset) {
      carbonOffsetCost = basePrice * materialMultiplier * sustainabilityPrograms.carbonOffset.priceMultiplier
    }

    // Add return program cost if enrolled
    let returnProgramCost = 0
    if (returnProgramEnrollment) {
      returnProgramCost = sustainabilityPrograms.returnProgram.pricePerUnit * quantity
    }

    // Calculate subtotal before discount
    const subtotal = basePrice * materialMultiplier + iotSensorCost + carbonOffsetCost + returnProgramCost

    // Apply bulk discount
    const discount = subtotal * bulkDiscount

    // Calculate final price
    const calculatedPrice = subtotal - discount
    setTotalPrice(Number.parseFloat(calculatedPrice.toFixed(2)))

    // Calculate CO2 savings
    let calculatedCO2Savings = 0

    if (isResendItPackage) {
      calculatedCO2Savings = resendItPackage.co2Reduction * quantity
    } else {
      calculatedCO2Savings = material.co2Reduction * quantity
    }

    // Additional savings from carbon offset program
    if (carbonOffset) {
      calculatedCO2Savings *= 1.5 // 50% additional offset
    }

    // Additional savings from return program (accounting for reuse)
    if (returnProgramEnrollment) {
      calculatedCO2Savings *= 1.25 // 25% additional savings from guaranteed reuse
    }

    setCo2Savings(Number.parseFloat(calculatedCO2Savings.toFixed(2)))
  }, [
    packageCategory,
    materialType,
    quantity,
    hasIotSensors,
    iotSensorCount,
    iotSensorConfig,
    orderType,
    carbonOffset,
    returnProgramEnrollment,
    isResendItPackage,
    packageSize,
  ])

  const handleLogoUpload = (url: string) => {
    setDesignData((prev) => ({ ...prev, logo: url }))
  }

  const handleFileUpload = (files: any[]) => {
    setDesignFiles([...designFiles, ...files])
  }

  const handleColorChange = (color: string, type: "brandColor" | "secondaryColor" | "textColor") => {
    setDesignData((prev) => ({ ...prev, [type]: color }))
  }

  const handleIoTFeatureChange = (feature: string, checked: boolean) => {
    setIotSensorConfig((prev) => ({
      ...prev,
      [feature]: checked,
    }))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    try {
      // Prepare the order data
      const orderData = {
        order_type: orderType,
        package_category: packageCategory,
        package_type: isResendItPackage ? "resend_it_premium" : undefined,
        material_type: materialType,
        dimensions: orderType === "custom" ? dimensions : undefined,
        quantity,
        has_iot_sensors: hasIotSensors,
        iot_sensor_count: iotSensorCount,
        iot_sensor_config: hasIotSensors ? iotSensorConfig : undefined,
        carbon_offset: carbonOffset,
        return_program_enrollment: returnProgramEnrollment,
        special_instructions: specialInstructions,
        design_data: designData,
        design_files: designFiles.map((file) => ({
          fileUrl: file.url,
          fileName: file.name,
          fileType: file.type,
          uploadedAt: new Date().toISOString(),
        })),
        estimated_co2_savings: co2Savings,
      }

      // Submit the order
      onSubmit(orderData)
    } catch (error) {
      console.error("Error submitting order:", error)
      toast({
        title: "Error",
        description: "Failed to submit your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (activeTab === "type") setActiveTab("material")
    else if (activeTab === "material") setActiveTab("design")
    else if (activeTab === "design") setActiveTab("smart")
    else if (activeTab === "smart") setActiveTab("sustainability")
    else if (activeTab === "sustainability") setActiveTab("review")
  }

  const handleBack = () => {
    if (activeTab === "material") setActiveTab("type")
    else if (activeTab === "design") setActiveTab("material")
    else if (activeTab === "smart") setActiveTab("design")
    else if (activeTab === "sustainability") setActiveTab("smart")
    else if (activeTab === "review") setActiveTab("sustainability")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design Your Sustainable Packaging</CardTitle>
          <CardDescription>Create eco-friendly, reusable packaging with your brand identity</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="type">Package Type</TabsTrigger>
              <TabsTrigger value="material">Material</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="smart">Smart Features</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              <TabsTrigger value="review">Review & Order</TabsTrigger>
            </TabsList>

            {/* Package Type Tab */}
            <TabsContent value="type" className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Select Order Type</h3>
                  <RadioGroup
                    value={orderType}
                    onValueChange={(value) => setOrderType(value as "standard" | "custom" | "bulk")}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="standard" id="standard" className="mt-1" />
                        <div>
                          <Label htmlFor="standard" className="text-base font-medium">
                            Standard Sizes
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Choose from our pre-defined packaging sizes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="custom" id="custom" className="mt-1" />
                        <div>
                          <Label htmlFor="custom" className="text-base font-medium">
                            Custom Size
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">Design your own custom-sized packaging</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="bulk" id="bulk" className="mt-1" />
                        <div>
                          <Label htmlFor="bulk" className="text-base font-medium">
                            Bulk Order
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">Large quantities with volume discounts</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Resend*it Premium Package</h3>
                    <Switch checked={isResendItPackage} onCheckedChange={setIsResendItPackage} />
                  </div>

                  {isResendItPackage && (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000016407%20%281%29-rTaUgtHDsO3D8x9cS6S1vx0jyHEDYq.png"
                            alt="Resend*it Premium Package"
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h4 className="font-medium text-lg">{resendItPackage.name}</h4>
                          <p className="text-muted-foreground mt-2">{resendItPackage.description}</p>

                          <div className="mt-4">
                            <h5 className="font-medium">Features:</h5>
                            <ul className="mt-2 space-y-1">
                              {resendItPackage.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <Leaf className="h-4 w-4 text-green-500" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <Label htmlFor="resendItSize">Select Size:</Label>
                            <Select value={packageSize} onValueChange={setPackageSize}>
                              <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                {resendItPackage.sizes.map((size) => (
                                  <SelectItem key={size.id} value={size.id}>
                                    {size.name} ({size.dimensions.width}" × {size.dimensions.height}")
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!isResendItPackage && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Package Category</h3>
                    <RadioGroup value={packageCategory} onValueChange={setPackageCategory}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageCategories.map((category) => (
                          <div key={category.id} className="flex items-start space-x-2">
                            <RadioGroupItem value={category.id} id={category.id} className="mt-1" />
                            <div>
                              <Label htmlFor={category.id} className="text-base font-medium">
                                {category.name}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {orderType === "standard" && !isResendItPackage && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Select Size</h3>
                    <RadioGroup value={packageSize} onValueChange={setPackageSize}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(availableSizes).map(([sizeKey, sizeData]) => (
                          <div key={sizeKey} className="flex items-start space-x-2">
                            <RadioGroupItem value={sizeKey} id={`size-${sizeKey}`} className="mt-1" />
                            <div>
                              <Label htmlFor={`size-${sizeKey}`} className="text-base font-medium">
                                {sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1)}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{sizeData.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {orderType === "custom" && (
                  <div className="space-y-4 mt-6 p-4 border rounded-md">
                    <h4 className="font-medium">Custom Dimensions</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (inches)</Label>
                        <Input
                          id="width"
                          type="number"
                          min="1"
                          step="0.125"
                          value={dimensions.width}
                          onChange={(e) => setDimensions({ ...dimensions, width: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (inches)</Label>
                        <Input
                          id="height"
                          type="number"
                          min="1"
                          step="0.125"
                          value={dimensions.height}
                          onChange={(e) => setDimensions({ ...dimensions, height: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="depth">Depth (inches)</Label>
                        <Input
                          id="depth"
                          type="number"
                          min="0.125"
                          step="0.125"
                          value={dimensions.depth}
                          onChange={(e) => setDimensions({ ...dimensions, depth: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 mt-6">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="quantity"
                      type="number"
                      min="50"
                      step="50"
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">Minimum order: 50 units</span>
                  </div>

                  {orderType === "bulk" && (
                    <div className="mt-4 bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Bulk Order Discounts</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        {sustainabilityPrograms.bulkDiscount.thresholds.map((threshold) => (
                          <li key={threshold.quantity} className="flex justify-between">
                            <span>{threshold.quantity}+ units:</span>
                            <span className={quantity >= threshold.quantity ? "font-bold" : ""}>
                              {(threshold.discount * 100).toFixed(0)}% discount
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Material Tab */}
            <TabsContent value="material" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Material</h3>

                {isResendItPackage ? (
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md border">
                    <div className="flex items-start space-x-2">
                      <div className="flex-1">
                        <h4 className="text-base font-medium">
                          {packagingMaterials.find((m) => m.id === resendItPackage.material)?.name || "PP Woven Fabric"}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {packagingMaterials.find((m) => m.id === resendItPackage.material)?.description ||
                            "Tear-resistant and lightweight • 200+ handling cycles • 30% less mass than cardboard"}
                        </p>
                        <div className="mt-2 flex items-center">
                          <Leaf className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-sm text-green-600 dark:text-green-400">
                            Saves approximately {resendItPackage.co2Reduction} kg CO₂ per unit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <RadioGroup value={materialType} onValueChange={setMaterialType}>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredMaterials.map((material) => (
                        <div key={material.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={material.id} id={material.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={material.id} className="text-base font-medium">
                              {material.name}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {material.recyclable && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  <Recycle className="h-3 w-3 mr-1" /> Recyclable
                                </span>
                              )}
                              {material.biodegradable && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  <Leaf className="h-3 w-3 mr-1" /> Biodegradable
                                </span>
                              )}
                              {material.reusable && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  <BarChart3 className="h-3 w-3 mr-1" /> {material.maxLifecycleCount}+ uses
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex items-center">
                              <Leaf className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-sm text-green-600 dark:text-green-400">
                                Saves approximately {material.co2Reduction} kg CO₂ per unit
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-md border">
                  <h3 className="text-lg font-medium mb-4">Material Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Material</th>
                          <th className="text-center py-2 px-3">Durability</th>
                          <th className="text-center py-2 px-3">Reusability</th>
                          <th className="text-center py-2 px-3">Water Resistance</th>
                          <th className="text-center py-2 px-3">CO₂ Reduction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packagingMaterials.slice(0, 5).map((material) => (
                          <tr key={material.id} className="border-b">
                            <td className="py-2 px-3 font-medium">{material.name}</td>
                            <td className="text-center py-2 px-3">
                              {material.features.includes("extreme_durability")
                                ? "★★★★★"
                                : material.features.includes("durable")
                                  ? "★★★★☆"
                                  : "★★★☆☆"}
                            </td>
                            <td className="text-center py-2 px-3">
                              {material.maxLifecycleCount > 100
                                ? "★★★★★"
                                : material.maxLifecycleCount > 50
                                  ? "★★★★☆"
                                  : material.maxLifecycleCount > 10
                                    ? "★★★☆☆"
                                    : material.maxLifecycleCount > 1
                                      ? "★★☆☆☆"
                                      : "★☆☆☆☆"}
                            </td>
                            <td className="text-center py-2 px-3">
                              {material.features.includes("waterproof")
                                ? "★★★★★"
                                : material.features.includes("water_resistant")
                                  ? "★★★★☆"
                                  : "★★☆☆☆"}
                            </td>
                            <td className="text-center py-2 px-3">
                              {material.co2Reduction >= 1.5
                                ? "★★★★★"
                                : material.co2Reduction >= 1.0
                                  ? "★★★★☆"
                                  : material.co2Reduction >= 0.7
                                    ? "★★★☆☆"
                                    : "★★☆☆☆"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Design Tab */}
            <TabsContent value="design" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Brand Design</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="useCompanyLogo">Use Company Logo</Label>
                      <Switch
                        id="useCompanyLogo"
                        checked={designData.useCompanyLogo}
                        onCheckedChange={(checked) => setDesignData({ ...designData, useCompanyLogo: checked })}
                      />
                    </div>

                    {designData.useCompanyLogo && (
                      <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <ImageUpload
                          value={designData.logo}
                          onChange={handleLogoUpload}
                          bucket="company-logos"
                          userId={userId}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="logoPosition">Logo Position</Label>
                      <RadioGroup
                        value={designData.logoPosition}
                        onValueChange={(value) => setDesignData({ ...designData, logoPosition: value })}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id="logo-left" />
                          <Label htmlFor="logo-left">Left</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="center" id="logo-center" />
                          <Label htmlFor="logo-center">Center</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id="logo-right" />
                          <Label htmlFor="logo-right">Right</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Brand Color</Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: designData.brandColor }}
                        />
                        <ColorPickerModal
                          color={designData.brandColor}
                          onChange={(color) => handleColorChange(color, "brandColor")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: designData.secondaryColor }}
                        />
                        <ColorPickerModal
                          color={designData.secondaryColor}
                          onChange={(color) => handleColorChange(color, "secondaryColor")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{ backgroundColor: designData.textColor }}
                        />
                        <ColorPickerModal
                          color={designData.textColor}
                          onChange={(color) => handleColorChange(color, "textColor")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalText">Additional Text</Label>
                      <Input
                        id="additionalText"
                        value={designData.additionalText}
                        onChange={(e) => setDesignData({ ...designData, additionalText: e.target.value })}
                        placeholder="Company name or slogan"
                      />
                    </div>
                  </div>

                  {orderType === "custom" && (
                    <div className="space-y-4 mt-6">
                      <h3 className="text-lg font-medium">Custom Design Files</h3>
                      <FileUpload onUpload={handleFileUpload} />

                      {designFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                          <ul className="space-y-1">
                            {designFiles.map((file, index) => (
                              <li key={index} className="text-sm">
                                {file.name}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2 h-6 w-6 p-0"
                                  onClick={() => setDesignFiles(designFiles.filter((_, i) => i !== index))}
                                >
                                  ×
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special requirements or instructions for your packaging"
                      rows={4}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-2" />
                      <p>Package preview will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Smart Features Tab */}
            <TabsContent value="smart" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">IoT Smart Sensors</h3>
                    <p className="text-sm text-muted-foreground">
                      Add intelligent tracking and monitoring to your packaging
                    </p>
                  </div>
                  <Switch checked={hasIotSensors} onCheckedChange={setHasIotSensors} />
                </div>

                {hasIotSensors && (
                  <div className="space-y-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                    <div className="space-y-2">
                      <Label htmlFor="sensorCount">Number of Sensors</Label>
                      <div className="flex items-center space-x-4">
                        <Input
                          id="sensorCount"
                          type="number"
                          min="1"
                          max={quantity}
                          value={iotSensorCount}
                          onChange={(e) => setIotSensorCount(Number.parseInt(e.target.value))}
                          className="w-32"
                        />
                        <span className="text-sm text-muted-foreground">
                          Base price: ${iotSensorInfo.pricePerSensor.toFixed(2)} per sensor
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Sensor Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {iotSensorInfo.features.map((feature) => (
                          <div key={feature.id} className="flex items-start space-x-2">
                            <Checkbox
                              id={feature.id}
                              checked={iotSensorConfig[feature.id as keyof typeof iotSensorConfig] as boolean}
                              onCheckedChange={(checked) => handleIoTFeatureChange(feature.id, checked as boolean)}
                              className="mt-1"
                            />
                            <div>
                              <Label htmlFor={feature.id} className="text-base font-medium">
                                {feature.name}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                +${feature.priceAdder.toFixed(2)} per sensor
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Battery Life</h4>
                      <RadioGroup
                        value={iotSensorConfig.batteryLife}
                        onValueChange={(value) =>
                          setIotSensorConfig((prev) => ({ ...prev, batteryLife: value as "standard" | "extended" }))
                        }
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {iotSensorInfo.batteryOptions.map((option) => (
                            <div key={option.id} className="flex items-start space-x-2">
                              <RadioGroupItem value={option.id} id={`battery-${option.id}`} className="mt-1" />
                              <div>
                                <Label htmlFor={`battery-${option.id}`} className="text-base font-medium">
                                  {option.name}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                                {option.priceAdder > 0 && (
                                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                    +${option.priceAdder.toFixed(2)} per sensor
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Reporting Frequency</h4>
                      <RadioGroup
                        value={iotSensorConfig.reportingFrequency}
                        onValueChange={(value) =>
                          setIotSensorConfig((prev) => ({
                            ...prev,
                            reportingFrequency: value as "realtime" | "hourly" | "daily",
                          }))
                        }
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {iotSensorInfo.reportingFrequencies.map((frequency) => (
                            <div key={frequency.id} className="flex items-start space-x-2">
                              <RadioGroupItem value={frequency.id} id={`freq-${frequency.id}`} className="mt-1" />
                              <div>
                                <Label htmlFor={`freq-${frequency.id}`} className="text-base font-medium">
                                  {frequency.name}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">{frequency.description}</p>
                                {frequency.priceAdder !== 0 && (
                                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                    {frequency.priceAdder > 0 ? "+" : ""}${frequency.priceAdder.toFixed(2)} per sensor
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-md">
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">IoT Sensor Benefits</h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span>Real-time visibility into your shipment's condition and location</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span>Proactive alerts for temperature excursions or damage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span>Detailed analytics for supply chain optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                          <span>Enhanced security with tamper detection</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {!hasIotSensors && (
                  <div className="p-6 border border-dashed rounded-md text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Add Smart Features to Your Packaging</h3>
                    <p className="text-muted-foreground mb-4">
                      IoT sensors enable real-time tracking, monitoring, and analytics for your shipments.
                    </p>
                    <Button onClick={() => setHasIotSensors(true)}>Enable Smart Features</Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Sustainability Tab */}
            <TabsContent value="sustainability" className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Carbon Offset Program</h3>
                    <p className="text-sm text-muted-foreground">Neutralize the carbon footprint of your shipments</p>
                  </div>
                  <Switch checked={carbonOffset} onCheckedChange={setCarbonOffset} />
                </div>

                {carbonOffset && (
                  <div className="p-4 border rounded-md bg-green-50 dark:bg-green-950">
                    <h4 className="font-medium text-green-700 dark:text-green-300">Carbon Offset Details</h4>
                    <p className="mt-2 text-sm">
                      Our carbon offset program invests in verified carbon reduction projects to neutralize the
                      environmental impact of your packaging and shipping.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                        <h5 className="font-medium">Reforestation</h5>
                        <p className="text-sm text-muted-foreground mt-1">Planting trees to capture CO₂</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                        <h5 className="font-medium">Renewable Energy</h5>
                        <p className="text-sm text-muted-foreground mt-1">Supporting solar and wind projects</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                        <h5 className="font-medium">Methane Capture</h5>
                        <p className="text-sm text-muted-foreground mt-1">Reducing landfill emissions</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-green-600 dark:text-green-400">
                      Cost: {(sustainabilityPrograms.carbonOffset.priceMultiplier * 100).toFixed(0)}% of order subtotal
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <h3 className="text-lg font-medium">Packaging Return Program</h3>
                    <p className="text-sm text-muted-foreground">
                      Return packaging for reuse and receive discounts on future orders
                    </p>
                  </div>
                  <Switch checked={returnProgramEnrollment} onCheckedChange={setReturnProgramEnrollment} />
                </div>

                {returnProgramEnrollment && (
                  <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Return Program Details</h4>
                    <p className="mt-2 text-sm">
                      Our return program makes it easy to send back your packaging for reuse, extending its lifecycle
                      and reducing waste.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <Recycle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Prepaid Return Labels</span>
                          <p className="text-sm text-muted-foreground">
                            Each package includes a QR code for generating a prepaid return label
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Future Order Discounts</span>
                          <p className="text-sm text-muted-foreground">
                            Receive a {(sustainabilityPrograms.returnProgram.discountPercentage * 100).toFixed(0)}%
                            discount on your next order when you return packaging
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Environmental Impact</span>
                          <p className="text-sm text-muted-foreground">
                            Each reuse cycle saves approximately 75% of the resources needed for new packaging
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
                      Cost: ${sustainabilityPrograms.returnProgram.pricePerUnit.toFixed(2)} per unit
                    </p>
                  </div>
                )}

                <div className="mt-8 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
                  <h3 className="text-lg font-medium mb-4">Environmental Impact Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium">CO₂ Savings</h4>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {co2Savings.toFixed(2)} kg
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Equivalent to {(co2Savings * 4.3).toFixed(1)} miles not driven
                      </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium">Plastic Reduction</h4>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {(quantity * 0.25).toFixed(1)} kg
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Compared to single-use plastic packaging</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-md">
                      <h4 className="font-medium">Water Saved</h4>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                        {(quantity * 15).toFixed(0)} L
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Compared to traditional packaging production</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="package-details">
                      <AccordionTrigger>Package Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Package Type:</span>
                            <span className="text-sm">
                              {isResendItPackage
                                ? resendItPackage.name
                                : orderType === "standard"
                                  ? "Standard"
                                  : orderType === "custom"
                                    ? "Custom"
                                    : "Bulk"}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Category:</span>
                            <span className="text-sm">
                              {packageCategories.find((c) => c.id === packageCategory)?.name || packageCategory}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Material:</span>
                            <span className="text-sm">
                              {packagingMaterials.find((m) => m.id === materialType)?.name || materialType}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Size:</span>
                            <span className="text-sm">
                              {isResendItPackage
                                ? resendItPackage.sizes.find((s) => s.id === packageSize)?.name || "Small"
                                : packageSize.charAt(0).toUpperCase() + packageSize.slice(1)}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Dimensions:</span>
                            <span className="text-sm">
                              {dimensions.width}" × {dimensions.height}" × {dimensions.depth}"
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Quantity:</span>
                            <span className="text-sm">{quantity} units</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="smart-features">
                      <AccordionTrigger>Smart Features</AccordionTrigger>
                      <AccordionContent>
                        {hasIotSensors ? (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">IoT Sensors:</span>
                              <span className="text-sm">{iotSensorCount} sensors</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Temperature Sensing:</span>
                              <span className="text-sm">{iotSensorConfig.temperatureSensing ? "Yes" : "No"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Humidity Sensing:</span>
                              <span className="text-sm">{iotSensorConfig.humiditySensing ? "Yes" : "No"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Location Tracking:</span>
                              <span className="text-sm">{iotSensorConfig.locationTracking ? "Yes" : "No"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Shock Detection:</span>
                              <span className="text-sm">{iotSensorConfig.shockDetection ? "Yes" : "No"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Tamper Detection:</span>
                              <span className="text-sm">{iotSensorConfig.tamperDetection ? "Yes" : "No"}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Battery Life:</span>
                              <span className="text-sm">
                                {iotSensorConfig.batteryLife === "standard"
                                  ? "Standard (30 days)"
                                  : "Extended (90 days)"}
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Reporting Frequency:</span>
                              <span className="text-sm">
                                {iotSensorConfig.reportingFrequency === "realtime"
                                  ? "Real-time"
                                  : iotSensorConfig.reportingFrequency === "hourly"
                                    ? "Hourly"
                                    : "Daily"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No IoT sensors added to this order.</p>
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="sustainability">
                      <AccordionTrigger>Sustainability Programs</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Carbon Offset:</span>
                            <span className="text-sm">{carbonOffset ? "Yes" : "No"}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Return Program:</span>
                            <span className="text-sm">{returnProgramEnrollment ? "Enrolled" : "Not enrolled"}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Estimated CO₂ Savings:</span>
                            <span className="text-sm text-green-600 dark:text-green-400">
                              {co2Savings.toFixed(2)} kg
                            </span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {specialInstructions && (
                      <AccordionItem value="special-instructions">
                        <AccordionTrigger>Special Instructions</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm whitespace-pre-wrap">{specialInstructions}</p>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>

                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <h4 className="font-medium mb-4">Price Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Base Package Price:</span>
                        <span className="text-sm">
                          $
                          {isResendItPackage
                            ? (resendItPackage.sizes.find((s) => s.id === packageSize)?.price || 29.99).toFixed(2)
                            : (packageCategories.find((c) => c.id === packageCategory)?.basePrice || 25.99).toFixed(
                                2,
                              )}{" "}
                          × {quantity}
                        </span>
                      </div>

                      {hasIotSensors && (
                        <div className="flex justify-between">
                          <span className="text-sm">IoT Sensors:</span>
                          <span className="text-sm">
                            ${iotSensorInfo.pricePerSensor.toFixed(2)} × {iotSensorCount}
                          </span>
                        </div>
                      )}

                      {carbonOffset && (
                        <div className="flex justify-between">
                          <span className="text-sm">Carbon Offset:</span>
                          <span className="text-sm">
                            +{(sustainabilityPrograms.carbonOffset.priceMultiplier * 100).toFixed(0)}% of subtotal
                          </span>
                        </div>
                      )}

                      {returnProgramEnrollment && (
                        <div className="flex justify-between">
                          <span className="text-sm">Return Program:</span>
                          <span className="text-sm">
                            ${sustainabilityPrograms.returnProgram.pricePerUnit.toFixed(2)} × {quantity}
                          </span>
                        </div>
                      )}

                      {orderType === "bulk" &&
                        quantity >= sustainabilityPrograms.bulkDiscount.thresholds[0].quantity && (
                          <div className="flex justify-between text-green-600 dark:text-green-400">
                            <span className="text-sm">Bulk Discount:</span>
                            <span className="text-sm">
                              -
                              {(sustainabilityPrograms.bulkDiscount.thresholds.find((t) => quantity >= t.quantity)
                                ?.discount || 0) * 100}
                              %
                            </span>
                          </div>
                        )}

                      <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Price:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Design Preview</h3>
                  <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-2" />
                      <p>Package preview will appear here</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-md">
                    <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Environmental Impact</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">CO₂ Savings:</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {co2Savings.toFixed(2)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Plastic Reduction:</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {(quantity * 0.25).toFixed(1)} kg
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Water Saved:</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {(quantity * 15).toFixed(0)} L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Trees Preserved:</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {(co2Savings / 21).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={activeTab === "type"}>
            Back
          </Button>

          {activeTab === "review" ? (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? "Submitting..." : "Place Order"}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
