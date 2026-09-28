package com.colomboplan.adminbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "programs")
public class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;
    private String shortCode;
    private String categoryBadge;
    private String establishedInfo;
    private String themeColor;
    private String imageUrl;
    private String heroImageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    private String portalButtonText;
    private String portalUrl;

    private String partnershipLabel;
    private String partnershipTitle;

    @Column(columnDefinition = "TEXT")
    private String partnershipStatsJson;

    private String featureSectionTitle;

    @Column(columnDefinition = "TEXT")
    private String featureCardsJson;

    private String initiativesSectionTitle;

    @Column(columnDefinition = "TEXT")
    private String initiativesJson;

    private String impactTitle;

    @Column(columnDefinition = "TEXT")
    private String impactDescription;

    @Column(columnDefinition = "TEXT")
    private String impactBadgesJson;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getShortCode() { return shortCode; }
    public void setShortCode(String shortCode) { this.shortCode = shortCode; }
    public String getCategoryBadge() { return categoryBadge; }
    public void setCategoryBadge(String categoryBadge) { this.categoryBadge = categoryBadge; }
    public String getEstablishedInfo() { return establishedInfo; }
    public void setEstablishedInfo(String establishedInfo) { this.establishedInfo = establishedInfo; }
    public String getThemeColor() { return themeColor; }
    public void setThemeColor(String themeColor) { this.themeColor = themeColor; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getHeroImageUrl() { return heroImageUrl; }
    public void setHeroImageUrl(String heroImageUrl) { this.heroImageUrl = heroImageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getPortalButtonText() { return portalButtonText; }
    public void setPortalButtonText(String portalButtonText) { this.portalButtonText = portalButtonText; }
    public String getPortalUrl() { return portalUrl; }
    public void setPortalUrl(String portalUrl) { this.portalUrl = portalUrl; }
    public String getPartnershipLabel() { return partnershipLabel; }
    public void setPartnershipLabel(String partnershipLabel) { this.partnershipLabel = partnershipLabel; }
    public String getPartnershipTitle() { return partnershipTitle; }
    public void setPartnershipTitle(String partnershipTitle) { this.partnershipTitle = partnershipTitle; }
    public String getPartnershipStatsJson() { return partnershipStatsJson; }
    public void setPartnershipStatsJson(String partnershipStatsJson) { this.partnershipStatsJson = partnershipStatsJson; }
    public String getFeatureSectionTitle() { return featureSectionTitle; }
    public void setFeatureSectionTitle(String featureSectionTitle) { this.featureSectionTitle = featureSectionTitle; }
    public String getFeatureCardsJson() { return featureCardsJson; }
    public void setFeatureCardsJson(String featureCardsJson) { this.featureCardsJson = featureCardsJson; }
    public String getInitiativesSectionTitle() { return initiativesSectionTitle; }
    public void setInitiativesSectionTitle(String initiativesSectionTitle) { this.initiativesSectionTitle = initiativesSectionTitle; }
    public String getInitiativesJson() { return initiativesJson; }
    public void setInitiativesJson(String initiativesJson) { this.initiativesJson = initiativesJson; }
    public String getImpactTitle() { return impactTitle; }
    public void setImpactTitle(String impactTitle) { this.impactTitle = impactTitle; }
    public String getImpactDescription() { return impactDescription; }
    public void setImpactDescription(String impactDescription) { this.impactDescription = impactDescription; }
    public String getImpactBadgesJson() { return impactBadgesJson; }
    public void setImpactBadgesJson(String impactBadgesJson) { this.impactBadgesJson = impactBadgesJson; }
}