"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Globe,
  LayoutGridIcon as LayoutHorizontal,
  LayoutGridIcon as LayoutVertical,
  Linkedin,
  Twitter,
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { BusinessCardEditor } from "@/components/business-card-editor"
import { useRouter } from "next/navigation"
import { ColorPickerModal } from "@/components/color-picker-modal"
import { ShareModal } from "@/components/share-modal"
import { SaveContactButton } from "@/components/save-contact-button"

interface BusinessCardPreviewProps {
  profile: {
    id: string
    full_name: string
    company: string
    job_title?: string
    email: string
    website: string
    linkedin_url?: string
    avatar_url?: string
    company_logo_url?: string
    xhandle?: string
    waddress?: string
    public_id?: string
    card_style?: {
      backgroundColor: string
      textColor: string
      primaryColor: string
    }
  }
  showEditor?: boolean
  isRecipient?: boolean
}

export function BusinessCardPreview({ profile, showEditor = true, isRecipient = false }: BusinessCardPreviewProps) {
  // Default card style if not provided in profile
  const defaultStyle = {
    backgroundColor: "#ffffff",
    textColor: "#333333",
    primaryColor: "#3b82f6",
  }

  const cardStyle = profile.card_style || defaultStyle

  const [isVertical, setIsVertical] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(cardStyle.backgroundColor)
  const router = useRouter()

  // Generate the profile URL for sharing
  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/p/${profile.public_id || profile.id}`
      : `${process.env.NEXT_PUBLIC_APP_URL || "https://platform.resend-it.com"}/p/${profile.public_id || profile.id}`

  const handleEditorUpdate = () => {
    router.refresh()
  }

  // Format website URL for display and linking
  const formatWebsiteForDisplay = (website: string) => {
    return website.replace(/^https?:\/\//, "").replace(/\/$/, "")
  }

  // Ensure website has http/https for linking
  const formatWebsiteForLink = (website: string) => {
    if (!website) return "#"
    return website.startsWith("http") ? website : `https://${website}`
  }

  // Format LinkedIn URL for display
  const formatLinkedInForDisplay = (url: string) => {
    if (!url) return ""
    return url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")
  }

  // Render horizontal business card layout
  const renderHorizontalCard = () => (
    <div className="w-full max-w-[890px] mx-auto aspect-[890/510] rounded-lg shadow-lg relative overflow-hidden">
      {/* Background layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: backgroundColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content layer - all elements will be on top of the background */}
      <div className="absolute inset-0 z-10">
        {/* Editor Button - positioned outside the content layer with higher z-index */}
        {showEditor && (
          <div className="absolute top-0 right-0 z-30">
            <BusinessCardEditor userId={profile.id} initialData={profile} onUpdate={handleEditorUpdate} />
          </div>
        )}

        {/* Company Logo */}
        {profile.company_logo_url && (
          <div className="absolute top-[3.9%] right-[2.2%] w-[16.9%] h-[29.4%] z-10">
            <Image
              src={profile.company_logo_url || "/placeholder.svg"}
              alt="Company Logo"
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Left side content */}
        <div className="absolute top-0 left-0 h-full p-[5.6%] flex flex-col justify-center">
          {/* Avatar */}
          {profile.avatar_url && (
            <div className="mb-[5.6%]">
              <div className="relative w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] xs:w-[80px] xs:h-[80px]">
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt="User Avatar"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-[3.9%]">
            <h2 className="text-4xl font-bold sm:text-3xl xs:text-2xl" style={{ color: cardStyle.primaryColor }}>
              {profile.full_name}
            </h2>

            {/* Job Title */}
            {profile.job_title && (
              <div>
                <p className="text-2xl sm:text-xl xs:text-lg" style={{ color: cardStyle.textColor }}>
                  {profile.job_title}
                </p>
              </div>
            )}

            {/* Company */}
            <div className="mb-2">
              <p className="text-2xl sm:text-xl xs:text-lg" style={{ color: cardStyle.textColor }}>
                {profile.company}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
              <Link
                href={`mailto:${profile.email}`}
                className="text-lg sm:text-base xs:text-sm break-all hover:underline"
                style={{ color: cardStyle.textColor }}
                aria-label={`Send email to ${profile.email}`}
              >
                {profile.email}
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
              <Link
                href={formatWebsiteForLink(profile.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-base xs:text-sm break-all hover:underline"
                style={{ color: cardStyle.textColor }}
                aria-label={`Visit website ${profile.website}`}
              >
                {formatWebsiteForDisplay(profile.website)}
              </Link>
            </div>

            {/* LinkedIn */}
            {profile.linkedin_url && (
              <div className="flex items-center space-x-2">
                <Linkedin className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
                <Link
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-base xs:text-sm break-all hover:underline"
                  style={{ color: cardStyle.textColor }}
                  aria-label={`Visit LinkedIn profile`}
                >
                  {formatLinkedInForDisplay(profile.linkedin_url)}
                </Link>
              </div>
            )}

            {/* X Handle */}
            {profile.xhandle && (
              <div className="flex items-center space-x-2">
                <Twitter className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
                <Link
                  href={`https://x.com/${profile.xhandle.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg sm:text-base xs:text-sm hover:underline"
                  style={{ color: cardStyle.textColor }}
                  aria-label={`Visit X profile`}
                >
                  {profile.xhandle}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  // Render vertical business card layout
  const renderVerticalCard = () => (
    <div className="w-full max-w-[510px] mx-auto aspect-[510/890] rounded-lg shadow-lg relative overflow-hidden">
      {/* Background layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: backgroundColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content layer - all elements will be on top of the background */}
      <div className="absolute inset-0 z-10">
        {/* Editor Button - positioned outside the content layer with higher z-index */}
        {showEditor && (
          <div className="absolute top-0 right-0 z-30">
            <BusinessCardEditor userId={profile.id} initialData={profile} onUpdate={handleEditorUpdate} />
          </div>
        )}

        {/* Company Logo Banner */}
        {profile.company_logo_url && (
          <div className="relative w-full h-[22.5%] flex items-center justify-center overflow-hidden z-10">
            <Image
              src={profile.company_logo_url || "/placeholder.svg"}
              alt="Company Logo"
              fill
              className="object-contain"
              style={{ objectPosition: "center" }}
            />
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>
          </div>
        )}

        {/* Avatar overlaying the banner */}
        {profile.avatar_url && (
          <div className="absolute top-[11.2%] left-[7.8%] w-[31.4%] h-[18%] rounded-full border-4 border-white overflow-hidden shadow-lg z-20">
            <Image src={profile.avatar_url || "/placeholder.svg"} alt="User Avatar" fill className="object-cover" />
          </div>
        )}

        {/* Contact Information */}
        <div className="absolute top-[31.5%] left-0 w-full px-[7.8%] space-y-[2.5%] z-10">
          <h2 className="text-4xl font-bold sm:text-3xl xs:text-2xl" style={{ color: cardStyle.primaryColor }}>
            {profile.full_name}
          </h2>

          {/* Job Title */}
          {profile.job_title && (
            <div>
              <p className="text-2xl sm:text-xl xs:text-lg" style={{ color: cardStyle.textColor }}>
                {profile.job_title}
              </p>
            </div>
          )}

          {/* Company */}
          <div className="mb-4">
            <p className="text-2xl sm:text-xl xs:text-lg" style={{ color: cardStyle.textColor }}>
              {profile.company}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
            <Link
              href={`mailto:${profile.email}`}
              className="text-lg sm:text-base xs:text-sm break-all hover:underline"
              style={{ color: cardStyle.textColor }}
              aria-label={`Send email to ${profile.email}`}
            >
              {profile.email}
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
            <Link
              href={formatWebsiteForLink(profile.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg sm:text-base xs:text-sm break-all hover:underline"
              style={{ color: cardStyle.textColor }}
              aria-label={`Visit website ${profile.website}`}
            >
              {formatWebsiteForDisplay(profile.website)}
            </Link>
          </div>

          {/* LinkedIn */}
          {profile.linkedin_url && (
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
              <Link
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-base xs:text-sm break-all hover:underline"
                style={{ color: cardStyle.textColor }}
                aria-label={`Visit LinkedIn profile`}
              >
                {formatLinkedInForDisplay(profile.linkedin_url)}
              </Link>
            </div>
          )}

          {/* X Handle */}
          {profile.xhandle && (
            <div className="flex items-center space-x-2">
              <Twitter className="w-5 h-5 flex-shrink-0" style={{ color: cardStyle.textColor }} />
              <Link
                href={`https://x.com/${profile.xhandle.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-base xs:text-sm hover:underline"
                style={{ color: cardStyle.textColor }}
                aria-label={`Visit X profile`}
              >
                {profile.xhandle}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Layout toggle */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-sm font-medium">Layout:</span>
        <Toggle pressed={!isVertical} onPressedChange={() => setIsVertical(false)} aria-label="Horizontal layout">
          <LayoutHorizontal className="h-4 w-4" />
          <span className="ml-2">Horizontal</span>
        </Toggle>
        <Toggle pressed={isVertical} onPressedChange={() => setIsVertical(true)} aria-label="Vertical layout">
          <LayoutVertical className="h-4 w-4" />
          <span className="ml-2">Vertical</span>
        </Toggle>
      </div>

      {/* Card container with responsive padding */}
      <div className="w-full px-3 sm:px-0">
        {/* Render the appropriate card layout */}
        {isVertical ? renderVerticalCard() : renderHorizontalCard()}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {/* Show different buttons based on whether the user is the owner or a recipient */}
        {isRecipient ? (
          <SaveContactButton userData={profile} />
        ) : (
          <>
            <ColorPickerModal
              profileId={profile.id}
              initialColor={backgroundColor}
              onColorChange={setBackgroundColor}
              initialTextColor={cardStyle.textColor}
              initialPrimaryColor={cardStyle.primaryColor}
            />
            <ShareModal profileId={profile.id} profileUrl={profileUrl} userData={profile} />
          </>
        )}
      </div>
    </div>
  )
}
