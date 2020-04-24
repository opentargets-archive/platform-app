const Summary = ({ reactome, slapenrich, progeny, crispr, sysBio }) =>
  [
    reactome && reactome.pathwayCount > 0 ? 'Reactome' : null,
    slapenrich && slapenrich.pathwayCount > 0 ? 'SLAPenrich' : null,
    progeny && progeny.pathwayCount > 0 ? 'PROGENy' : null,
    crispr && crispr.hasCrispr ? 'CRISPR' : null,
    sysBio && sysBio.hasSysBio ? 'SysBio' : null,
  ]
    .filter(d => d)
    .join(' • ');

export default Summary;
